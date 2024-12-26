import { useTranslation } from 'react-i18next'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface PasswordStrengthIndicatorProps {
  strength: number
}

export function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <Progress
        value={strength}
        className={cn(
          "h-1",
          strength <= 25 && "text-destructive",
          strength > 25 && strength <= 50 && "text-warning",
          strength > 50 && strength <= 75 && "text-info",
          strength > 75 && "text-success"
        )}
      />
      <p className={cn(
        "text-xs",
        strength <= 25 && "text-destructive",
        strength > 25 && strength <= 50 && "text-warning",
        strength > 50 && strength <= 75 && "text-info",
        strength > 75 && "text-success"
      )}>
        {strength <= 25 && t('auth.passwordstrength.weak')}
        {strength > 25 && strength <= 50 && t('auth.passwordstrength.fair')}
        {strength > 50 && strength <= 75 && t('auth.passwordstrength.good')}
        {strength > 75 && t('auth.passwordstrength.strong')}
      </p>
    </div>
  )
}
