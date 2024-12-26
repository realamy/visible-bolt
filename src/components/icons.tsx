import * as React from "react"
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  Eye,
  Facebook,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  type LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type LucideIcon,
  BadgeCheck,
  Shield,
  Wallet,
  CheckCircle2,
  Verified,
} from "lucide-react"

export type Icon = LucideIcon

const GoogleIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      ref={ref}
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      />
    </svg>
  )
)
GoogleIcon.displayName = "GoogleIcon"

const CheckIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
)
CheckIcon.displayName = "CheckIcon"

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: Pizza,
  ellipsis: MoreVertical,
  add: Plus,
  warning: HelpCircle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  verified: BadgeCheck,
  shield: Shield,
  wallet: Wallet,
  twitter: Twitter,
  facebook: Facebook,
  google: GoogleIcon,
  check: CheckIcon,
  briefcase: Briefcase,
} as const
