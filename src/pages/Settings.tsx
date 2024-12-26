import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/components/theme-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Globe, Sun, Moon, Laptop } from 'lucide-react'

export default function Settings() {
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()

  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ]

  // Theme options
  const themeOptions = [
    { value: 'light', label: t('settings.theme.light'), icon: Sun },
    { value: 'dark', label: t('settings.theme.dark'), icon: Moon },
    { value: 'system', label: t('settings.theme.system'), icon: Laptop }
  ]

  return (
    <div className="container max-w-2xl mx-auto space-y-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h2>
        <p className="text-muted-foreground">
          {t('settings.description')}
        </p>
      </div>
      
      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('settings.language.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={currentLanguage}
            onValueChange={changeLanguage}
            className="grid gap-4"
          >
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center space-x-2">
                <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                <Label
                  htmlFor={`lang-${lang.code}`}
                  className="flex flex-1 items-center justify-between rounded-lg border p-4 hover:bg-accent"
                >
                  <div className="space-y-0.5">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-[0.8rem] text-muted-foreground block">
                      {t(`settings.language.${lang.code}Description`)}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5" />
            ) : theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Laptop className="w-5 h-5" />
            )}
            {t('settings.theme.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid gap-4"
          >
            {themeOptions.map((option) => {
              const Icon = option.icon
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`theme-${option.value}`} />
                  <Label
                    htmlFor={`theme-${option.value}`}
                    className="flex flex-1 items-center justify-between rounded-lg border p-4 hover:bg-accent"
                  >
                    <div className="space-y-0.5">
                      <div className="font-medium flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {option.label}
                      </div>
                      <span className="text-[0.8rem] text-muted-foreground block">
                        {t(`settings.theme.${option.value}Description`)}
                      </span>
                    </div>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
