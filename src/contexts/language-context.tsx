import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageCode } from '@/data/categories'
import { DirectionProvider } from "@radix-ui/react-direction"

interface LanguageContextType {
  language: LanguageCode
  direction: 'ltr' | 'rtl'
  setLanguage: (lang: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as LanguageCode | null
    if (storedLang) {
      setLanguageState(storedLang)
      document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.classList.remove('font-sans', 'font-arabic')
      document.documentElement.classList.add(storedLang === 'ar' ? 'font-arabic' : 'font-sans')
      i18n.changeLanguage(storedLang)
    }
  }, [i18n])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.remove('font-sans', 'font-arabic')
    document.documentElement.classList.add(lang === 'ar' ? 'font-arabic' : 'font-sans')
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      <DirectionProvider dir={direction}>{children}</DirectionProvider>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
