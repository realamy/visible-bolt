import 'i18next';

// Define JSON module
declare module '*.json' {
    const value: { [key: string]: any };
    export default value;
}

// Import JSON translation files
import commonEn from '../locales/en/common.json';

// Utility type for nested keys with better type inference
type RecursiveKeyOf<TObj extends Record<string, any>> = {
    [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
        ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
        : `${TKey}`;
}[keyof TObj & string];

// Define supported languages
export type SupportedLanguages = 'en' | 'fr' | 'ar';

// Define namespace structure
export interface Namespaces {
    common: typeof commonEn;
}

// Define translation function return type
type TranslationValue = string | number | Array<string> | { [key: string]: string };

// Define all translation keys
export type TranslationKeys = RecursiveKeyOf<typeof commonEn>;

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: Namespaces;
        returnNull: false;
        keySeparator: '.';
        // Support for nested keys with better type inference
        key: TranslationKeys;
        // Define return type for translation function
        returnType: TranslationValue;
    }
}
