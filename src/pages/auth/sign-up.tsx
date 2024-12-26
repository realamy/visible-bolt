import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { MultiStepForm } from '@/components/auth/multi-step-form'
import { UserTypeSelection, type UserType } from '@/components/auth/user-type-selection'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function SignUpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register } = useAuth()
  const { toast } = useToast()
  const [userType, setUserType] = useState<UserType | null>(null)

  const handleSubmit = async (data: any) => {
    try {
      await register(data)
      toast({
        title: t('auth.success'),
        description: t('auth.successdescription'),
      })
      navigate('/')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('auth.error'),
        description: t('auth.errordescription'),
      })
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/auth/sign-in"
        className={cn(
          "absolute right-4 top-4 md:right-8 md:top-8",
          "inline-flex items-center rounded-lg bg-transparent px-3 py-2",
          "text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {t('auth.buttons.signin')}
      </Link>
      
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('auth.createaccount')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('auth.createaccountdescription')}
            </p>
          </div>

          {!userType ? (
            <UserTypeSelection
              onSelect={setUserType}
              selectedType={userType}
            />
          ) : (
            <MultiStepForm
              userType={userType}
              onSubmit={handleSubmit}
            />
          )}

          {!userType && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('auth.or')}
                </span>
              </div>
            </div>
          )}

          {!userType && (
            <div className="grid gap-4">
              <Button variant="outline" type="button" disabled>
                <Icons.facebook className="mr-2 h-4 w-4" />
                {t('auth.continuewithfacebook')}
              </Button>
              <Button variant="outline" type="button" disabled>
                <Icons.google className="mr-2 h-4 w-4" />
                {t('auth.continuewithgoogle')}
              </Button>
            </div>
          )}

          <p className="px-8 text-center text-sm text-muted-foreground">
            {t('auth.byclickingcontinue')}{' '}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('auth.terms')}
            </Link>{' '}
            {t('auth.and')}{' '}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('auth.privacy')}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
