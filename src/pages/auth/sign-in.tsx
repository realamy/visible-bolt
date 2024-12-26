import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
})

export default function SignInPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await login(values.email, values.password)
      navigate('/')
    } catch (error) {
      console.error(error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[400px] space-y-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('auth.welcomeback')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('auth.signindescription')}
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <Button variant="outline" className="w-full" type="button">
          <Icons.facebook className="mr-2 h-4 w-4" />
          {t('auth.continuewithfacebook')}
        </Button>
        <Button variant="outline" className="w-full" type="button">
          <Icons.google className="mr-2 h-4 w-4" />
          {t('auth.continuewithgoogle')}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            {t('auth.orcontinuewith')}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.fields.email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center justify-between">
                    {t('auth.fields.password')}
                    <Link
                      to="/auth/reset-password"
                      className="text-xs font-normal text-muted-foreground hover:text-primary"
                    >
                      {t('auth.forgotpassword')}
                    </Link>
                  </span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('auth.signin')}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        {t('auth.noaccount')}{' '}
        <Link
          to="/auth/sign-up"
          className="font-medium hover:text-primary underline underline-offset-4"
        >
          {t('auth.createaccount')}
        </Link>
      </p>
    </div>
  )
}
