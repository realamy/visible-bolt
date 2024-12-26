import { Eye, Lightbulb, Stars } from "lucide-react";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

export function LogoWithSpotlightIteration() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg p-2 rotate-12">
          <Lightbulb className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <Stars className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className={cn(
          "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600 leading-none",
          isArabic ? "font-alshohadaa text-2xl tracking-normal" : "font-sans text-xl tracking-tight"
        )}>
          {t('brand.name')}
        </span>
        <span className={cn(
          "text-xs text-muted-foreground leading-none",
          isArabic && "font-noto-arabic"
        )}>
          {t('brand.slogan.illuminate')}
        </span>
      </div>
    </div>
  );
}

export const LogoWithEyeIteration = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-3",
        "group transition-opacity hover:opacity-90"
      )}
    >
      <div className="relative h-8 w-8 shrink-0">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg group-hover:shadow-emerald-500/20" />
        <div className="absolute inset-0.5 rounded-[10px] bg-white dark:bg-black" />
        <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className={cn(
          "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 leading-none",
          isArabic ? "font-alshohadaa text-2xl tracking-normal" : "font-sans text-xl tracking-tight"
        )}>
          {t('brand.name')}
        </span>
        {/* <span className={cn(
          "text-xs text-muted-foreground leading-none",
          isArabic && "font-noto-arabic"
        )}>
          {t('brand.slogan.emerge')}
        </span> */}
      </div>
    </Link>
  )
}

export const LogoWithCircleIteration = ({ textSize }: { textSize?: string }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-3",
        "group transition-opacity hover:opacity-90"
      )}
    >
      <div className="relative h-8 w-8 shrink-0">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg group-hover:shadow-emerald-500/20" />
        <div className="absolute inset-0.5 rounded-[10px] bg-white dark:bg-black" />
        <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
          <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className={cn(
          "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 leading-none",
          isArabic ? "font-alshohadaa text-2xl tracking-normal" : "font-sans text-xl tracking-tight"
        )
        }>
          {t('brand.name')}
        </span>
        <span className={cn(
          "text-xs text-muted-foreground leading-none",
          isArabic && "font-noto-arabic"
        )}>
          {t('brand.slogan.emerge')}
        </span>
      </div>
    </Link>
  )
}