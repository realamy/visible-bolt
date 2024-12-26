import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icons } from '@/components/icons'
import { LogoWithEyeIteration } from '@/components/Logo/Logo'
import { cn } from '@/lib/utils'

export default function AuthLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isSignIn = location.pathname.includes('sign-in')
  const isSignUp = location.pathname.includes('sign-up')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-stretch shadow-2xl rounded-2xl overflow-hidden bg-card">
        <div className={cn(
          "relative flex-1 p-6 sm:p-8 lg:p-12 bg-primary/5 dark:bg-primary/10 order-2 lg:order-1",
          "lg:block", // Always show on desktop
          isSignIn || isSignUp ? "hidden" : "block" // Hide on mobile when showing auth forms
        )}>
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
          <div className="relative h-full flex flex-col justify-between max-w-[500px] mx-auto lg:mx-0">
            <div className="space-y-2 mb-8 lg:mb-0">
              <div className="block lg:hidden">
                <LogoWithEyeIteration />
              </div>
              <div className="hidden lg:block">
                <LogoWithEyeIteration />
              </div>
              <div className="pt-6 lg:pt-8 space-y-4 lg:space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {t('brand.tagline')}
                </h1>
                <p className="text-base lg:text-lg text-muted-foreground">
                  {t('brand.description')}
                </p>
              </div>
            </div>
            
            <div className="hidden lg:block space-y-8">
              <div className="grid gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <Icons.verified className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('brand.feature1title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('brand.feature1description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <Icons.shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('brand.feature2title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('brand.feature2description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <Icons.wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('brand.feature3title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('brand.feature3description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="block lg:hidden mt-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-primary/10 backdrop-blur-sm space-y-2">
                  <Icons.verified className="w-6 h-6 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t('brand.feature1title')}
                  </h3>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-primary/10 backdrop-blur-sm space-y-2">
                  <Icons.shield className="w-6 h-6 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t('brand.feature2title')}
                  </h3>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-primary/10 backdrop-blur-sm space-y-2 col-span-2 sm:col-span-1">
                  <Icons.wallet className="w-6 h-6 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t('brand.feature3title')}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "flex-1 p-4 sm:p-8 lg:p-12 order-1 lg:order-2",
          "lg:block", // Always show on desktop
          isSignIn || isSignUp ? "block" : "hidden" // Show on mobile only when showing auth forms
        )}>
          <div className={cn(
            "mb-6", // Add margin only when logo is visible
            isSignIn || isSignUp ? "block lg:hidden" : "hidden" // Show logo on mobile only when showing auth forms
          )}>
            <LogoWithEyeIteration />
          </div>
          <div className="w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
