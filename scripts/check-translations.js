import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface
let rl;

// Promisify readline question
const question = async (query) => {
  if (!rl || rl.closed) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  
  return new Promise((resolve) => {
    try {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    } catch (error) {
      console.error('Error in readline:', error);
      resolve('n'); // Default to 'no' if there's an error
    }
  });
};

// Configuration
const config = {
  sourceLanguage: 'en',
  localesDir: path.join(__dirname, '../src/locales'),
  srcDir: path.join(__dirname, '../src'),
  supportedLanguages: ['en', 'fr', 'ar'],
  componentsDir: path.join(__dirname, '../src/components'),
  pagesDir: path.join(__dirname, '../src/pages'),
};

// Utility functions
function loadTranslationFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((keys, key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      return [...keys, ...getAllKeys(obj[key], newPrefix)];
    }
    return [...keys, newPrefix];
  }, []);
}

function findKeyInObject(obj, targetKey) {
  const keys = targetKey.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || typeof current !== 'object') return undefined;
    current = current[key];
  }

  return current;
}

async function findComponentsWithTranslations() {
  const pattern = '**/*.{tsx,ts,jsx,js}';
  const files = await glob(pattern, { cwd: config.srcDir });
  const componentMap = new Map();
  const keyRegex = /t\(['"]([^'"]+)['"]\)/g;
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(config.srcDir, file), 'utf8');
    const keys = new Set();
    let match;
    
    while ((match = keyRegex.exec(content)) !== null) {
      keys.add(match[1]);
    }
    
    if (keys.size > 0) {
      componentMap.set(file, Array.from(keys));
    }
  }
  
  return componentMap;
}

async function analyzeTranslationUsage() {
  const translations = {};
  config.supportedLanguages.forEach(lang => {
    const filePath = path.join(config.localesDir, lang, 'common.json');
    translations[lang] = loadTranslationFile(filePath);
  });

  const componentUsage = await findComponentsWithTranslations();
  const analysis = {
    components: new Map(),
    missingTranslations: new Map(),
    suggestions: new Map(),
  };

  // Get all translation keys from English file for reference
  const enKeys = getAllKeys(translations['en']);
  const keyMapping = new Map();

  // Create mapping of old keys to new keys based on English translations
  enKeys.forEach(key => {
    const lowerKey = key.toLowerCase();
    if (key !== lowerKey) {
      keyMapping.set(key, lowerKey);
    }
  });

  // Check for missing or untranslated keys in other languages
  const otherLanguages = config.supportedLanguages.filter(lang => lang !== 'en');
  for (const lang of otherLanguages) {
    const langKeys = getAllKeys(translations[lang]);
    const missingKeys = [];
    const untranslatedKeys = [];

    // Find keys that exist in English but not in this language
    for (const enKey of enKeys) {
      const value = findKeyInObject(translations[lang], enKey);
      if (!value) {
        missingKeys.push(enKey);
      } else if (value === findKeyInObject(translations['en'], enKey)) {
        // If the value is exactly the same as English, it might be untranslated
        untranslatedKeys.push({
          key: enKey,
          value: value
        });
      }
    }

    if (missingKeys.length > 0) {
      analysis.missingTranslations.set(`${lang}_missing`, missingKeys);
    }
    if (untranslatedKeys.length > 0) {
      analysis.missingTranslations.set(`${lang}_untranslated`, untranslatedKeys);
    }
  }

  for (const [component, keys] of componentUsage) {
    const componentAnalysis = {
      translationKeys: keys,
      missingInLanguages: {},
      inconsistentKeys: [],
      suggestions: [],
      untranslatedKeys: new Set(),
    };

    for (const key of keys) {
      // Check for missing translations and untranslated content
      for (const lang of config.supportedLanguages) {
        const value = findKeyInObject(translations[lang], key);
        const enValue = findKeyInObject(translations['en'], key);
        
        if (!value) {
          if (!componentAnalysis.missingInLanguages[lang]) {
            componentAnalysis.missingInLanguages[lang] = [];
          }
          componentAnalysis.missingInLanguages[lang].push(key);
        } else if (lang !== 'en' && value === enValue) {
          componentAnalysis.untranslatedKeys.add(key);
        }
      }

      // Check for case mismatches with existing translations
      if (keyMapping.has(key)) {
        componentAnalysis.inconsistentKeys.push(key);
        componentAnalysis.suggestions.push({
          original: key,
          suggested: keyMapping.get(key),
          reason: "Translation key should match the case in translation files",
          type: 'keyCase',
        });
      }

      // Check for specific patterns
      if (key.includes('Title') || key.includes('Description')) {
        const newKey = key.replace('Title', 'title').replace('Description', 'description');
        componentAnalysis.inconsistentKeys.push(key);
        componentAnalysis.suggestions.push({
          original: key,
          suggested: newKey,
          reason: "Translation key should use lowercase for 'title' and 'description'",
          type: 'keyCase',
        });
      }
    }

    analysis.components.set(component, componentAnalysis);
  }

  return analysis;
}

async function applyFileChange(filePath, from, to) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
  fs.writeFileSync(filePath, updatedContent);
}

async function updateTranslationFiles(originalKey, newKey) {
  for (const lang of config.supportedLanguages) {
    const filePath = path.join(config.localesDir, lang, 'common.json');
    const translations = loadTranslationFile(filePath);
    
    // Get the original value
    const value = findKeyInObject(translations, originalKey);
    if (value) {
      // Create the new key structure
      const keys = newKey.split('.');
      let current = translations;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      // Remove the old key
      const oldKeys = originalKey.split('.');
      let oldCurrent = translations;
      for (let i = 0; i < oldKeys.length - 1; i++) {
        if (!oldCurrent[oldKeys[i]]) break;
        oldCurrent = oldCurrent[oldKeys[i]];
      }
      delete oldCurrent[oldKeys[oldKeys.length - 1]];

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
    }
  }
}

async function promptAndApplyChanges(analysis) {
  console.log('\n🔄 Interactive Change Application\n');

  try {
    for (const [component, data] of analysis.components) {
      if (data.suggestions.length === 0) continue;

      console.log(`\n📁 Processing ${component}:`);
      
      for (const suggestion of data.suggestions) {
        console.log('\n----------------------------------------');
        console.log(`Suggested Change:`);
        console.log(`  From: ${suggestion.from || suggestion.original}`);
        console.log(`    To: ${suggestion.to || suggestion.suggested}`);
        console.log(`Reason: ${suggestion.reason}\n`);

        const answer = await question('Apply this change? (y/n): ');
        
        if (answer.toLowerCase() === 'y') {
          try {
            // Update the component file
            const componentPath = path.join(config.srcDir, component);
            await applyFileChange(
              componentPath,
              `t('${suggestion.original}')`,
              `t('${suggestion.suggested}')`
            );

            // If it's a key rename, update translation files
            if (suggestion.type === 'keyRename' || suggestion.type === 'keyCase') {
              await updateTranslationFiles(suggestion.original, suggestion.suggested);
            }

            console.log('✅ Change applied successfully!\n');
          } catch (error) {
            console.error('❌ Error applying change:', error.message);
          }
        } else {
          console.log('⏭️  Skipping this change\n');
        }
      }
    }
  } finally {
    // Ensure readline is closed even if there's an error
    if (rl && !rl.closed) {
      rl.close();
    }
  }
}

async function generateReport() {
  console.log('🔍 Analyzing translation usage in components...\n');
  
  const analysis = await analyzeTranslationUsage();
  
  // Print missing translations in each language
  console.log('❌ Missing Translations:\n');
  for (const [langKey, keys] of analysis.missingTranslations) {
    const [lang, type] = langKey.split('_');
    console.log(`${lang.toUpperCase()} (${type}):`);
    if (type === 'missing') {
      keys.forEach(key => {
        console.log(`  - ${key}`);
      });
    } else if (type === 'untranslated') {
      keys.forEach(({key, value}) => {
        console.log(`  - ${key}: "${value}" (same as English)`);
      });
    }
    console.log();
  }

  // Print component analysis
  console.log('📊 Component Translation Analysis:\n');
  for (const [component, data] of analysis.components) {
    console.log(`\n📁 ${component}:`);
    
    if (data.untranslatedKeys.size > 0) {
      console.log('\n  ⚠️  Keys using English content:');
      Array.from(data.untranslatedKeys).forEach(key => {
        console.log(`    - ${key}`);
      });
    }

    if (Object.keys(data.missingInLanguages).length > 0) {
      console.log('\n  ❌ Missing Translations:');
      for (const [lang, keys] of Object.entries(data.missingInLanguages)) {
        console.log(`    ${lang.toUpperCase()}:`);
        keys.forEach(key => {
          console.log(`      - ${key}`);
        });
      }
    }

    if (data.suggestions.length > 0) {
      console.log('\n  💡 Suggested Changes:');
      data.suggestions.forEach(suggestion => {
        console.log(`    - Change "${suggestion.original}" to "${suggestion.suggested}"`);
        console.log(`      Reason: ${suggestion.reason}\n`);
      });
    }
  }

  // Prompt for changes
  await promptAndApplyChanges(analysis);
}

// Run the analysis
generateReport();
