import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Icons } from '@/components/icons'
import { type UserType } from '@/components/auth/user-type-selection'
import { cn } from '@/lib/utils'
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator'

// Common schema for both user types
const basicInfoFields = {
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}

// Freelancer-specific schema
const freelancerSchema = z.object({
  ...basicInfoFields,
  profession: z.string().min(2, 'Profession is required'),
  skills: z.string().min(2, 'Skills are required'),
  experience: z.string().min(2, 'Experience is required'),
  hourlyRate: z.string().min(1, 'Hourly rate is required'),
})

// Client-specific schema
const clientSchema = z.object({
  ...basicInfoFields,
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters'),
})

interface MultiStepFormProps {
  userType: UserType
  onSubmit: (data: z.infer<typeof freelancerSchema> | z.infer<typeof clientSchema>) => void
}

export function MultiStepForm({ userType, onSubmit }: MultiStepFormProps) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = React.useState(0)
  const schema = userType === 'freelancer' ? freelancerSchema : clientSchema
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const steps = userType === 'freelancer' 
    ? [
        { title: t('auth.steps.basicinfo'), fields: ['name', 'email', 'password'] },
        { title: t('auth.steps.professional'), fields: ['profession', 'skills'] },
        { title: t('auth.steps.experience'), fields: ['experience', 'hourlyRate'] },
      ]
    : [
        { title: t('auth.steps.basicinfo'), fields: ['name', 'email', 'password'] },
        { title: t('auth.steps.company'), fields: ['companyName', 'industry'] },
        { title: t('auth.steps.project'), fields: ['projectDescription'] },
      ]

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const renderStepIndicators = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border",
              index === currentStep && "bg-primary text-primary-foreground border-primary",
              index < currentStep && "bg-primary/20 border-primary/20",
              index > currentStep && "bg-background border-input"
            )}
          >
            {index < currentStep ? (
              <Icons.check className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  )

  const renderCurrentStep = () => {
    const currentFields = steps[currentStep].fields
    
    return (
      <div className="space-y-4">
        {currentFields.map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{t(`auth.fields.${field}`)}</FormLabel>
                {field === 'password' ? (
                  <div className="space-y-2">
                    <FormControl>
                      <Input
                        type="password"
                        {...formField}
                        onChange={(e) => {
                          formField.onChange(e)
                          form.trigger('password')
                        }}
                      />
                    </FormControl>
                    {formField.value && (
                      <PasswordStrengthIndicator
                        strength={calculatePasswordStrength(formField.value)}
                      />
                    )}
                  </div>
                ) : field === 'projectDescription' ? (
                  <FormControl>
                    <Textarea {...formField} />
                  </FormControl>
                ) : (
                  <FormControl>
                    <Input {...formField} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    )
  }

  const handleNext = async () => {
    const currentFields = steps[currentStep].fields
    const isValid = await form.trigger(currentFields as any)
    
    if (isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        onSubmit(form.getValues())
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        {renderStepIndicators()}
        <div className="min-h-[300px]">
          {renderCurrentStep()}
        </div>
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            {t('auth.buttons.back')}
          </Button>
          <Button type="button" onClick={handleNext}>
            {currentStep === totalSteps - 1 
              ? t('auth.buttons.submit')
              : t('auth.buttons.next')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

function calculatePasswordStrength(password: string): number {
  let strength = 0
  
  // Length check
  if (password.length >= 8) strength += 25
  
  // Contains number
  if (/\d/.test(password)) strength += 25
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 25
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 25
  
  return strength
}
