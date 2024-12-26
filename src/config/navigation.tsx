import {
  Home,
  Briefcase,
  MessageSquare,
  Users,
  Settings,
  HelpCircle,
  UserCircle,
  Bell,
  Grid,
  DollarSign,
  FileText,
  Award,
  Search,
  BarChart,
  TicketIcon,
  FileIcon,
  UserCog,
} from 'lucide-react'
import { Icon } from 'lucide-react'


export type UserRole = 'client' | 'freelancer' | 'admin'

export interface NavItem {
  icon: typeof Icon
  label: string
  to: string
  roles?: UserRole[]
  requiredAuth?: boolean
  mobileOnly?: boolean
  desktopOnly?: boolean
}

// Public navigation items (Navbar)
export const mainNavItems: NavItem[] = [
  {
    icon: Home,
    label: 'menu.navigation.home',
    to: '/',
  },
  {
    icon: Search,
    label: 'menu.navigation.search',
    to: '/search',
    mobileOnly: true,
  },
  {
    icon: Briefcase,
    label: 'menu.navigation.projects',
    to: '/projects',
  },
  {
    icon: Users,
    label: 'menu.navigation.freelancers',
    to: '/freelancers',
  },
  {
    icon: HelpCircle,
    label: 'menu.navigation.help',
    to: '/help',
    desktopOnly: true,
  }
]

// Dashboard navigation items (Sidebar & Mobile)
export const dashboardNavItems: NavItem[] = [
  // Freelancer Items
  {
    icon: Grid,
    label: 'dashboard.nav.overview',
    to: '/dashboard',
    roles: ['freelancer']
  },
  {
    icon: Briefcase,
    label: 'dashboard.nav.activeProjects',
    to: '/dashboard/projects',
    roles: ['freelancer']
  },
  {
    icon: Award,
    label: 'dashboard.nav.reputation',
    to: '/dashboard/reputation',
    roles: ['freelancer']
  },
  {
    icon: DollarSign,
    label: 'dashboard.nav.earnings',
    to: '/dashboard/earnings',
    roles: ['freelancer']
  },

  // Client Items
  {
    icon: Grid,
    label: 'dashboard.nav.overview',
    to: '/dashboard',
    roles: ['client']
  },
  {
    icon: Briefcase,
    label: 'dashboard.nav.myProjects',
    to: '/dashboard/projects',
    roles: ['client']
  },
  {
    icon: Users,
    label: 'dashboard.nav.findFreelancers',
    to: '/dashboard/freelancers',
    roles: ['client']
  },
  {
    icon: DollarSign,
    label: 'dashboard.nav.payments',
    to: '/dashboard/payments',
    roles: ['client']
  },

  // Admin Items
  {
    icon: BarChart,
    label: 'dashboard.nav.analytics',
    to: '/dashboard',
    roles: ['admin']
  },
  {
    icon: UserCog,
    label: 'dashboard.nav.userManagement',
    to: '/dashboard/users',
    roles: ['admin']
  },
  {
    icon: FileIcon,
    label: 'dashboard.nav.contentManagement',
    to: '/dashboard/content',
    roles: ['admin']
  },
  {
    icon: TicketIcon,
    label: 'dashboard.nav.supportTickets',
    to: '/dashboard/tickets',
    roles: ['admin']
  },

  // Common Items (Available to all authenticated users)
  {
    icon: MessageSquare,
    label: 'dashboard.nav.messages',
    to: '/dashboard/messages',
    roles: ['freelancer', 'client']
  },
  {
    icon: FileText,
    label: 'dashboard.nav.contracts',
    to: '/dashboard/contracts',
    roles: ['freelancer', 'client']
  },
  {
    icon: Bell,
    label: 'dashboard.nav.notifications',
    to: '/dashboard/notifications',
    roles: ['freelancer', 'client', 'admin']
  },
  {
    icon: Settings,
    label: 'dashboard.nav.settings',
    to: '/dashboard/settings',
    roles: ['freelancer', 'client', 'admin']
  }
]

// User dropdown items (Navbar dropdown)
export const userNavItems: NavItem[] = [
  {
    icon: UserCircle,
    label: 'menu.user.profile',
    to: '/profile',
    requiredAuth: true
  },
  {
    icon: Grid,
    label: 'menu.user.dashboard',
    to: '/dashboard',
    requiredAuth: true
  },
  {
    icon: Settings,
    label: 'menu.user.settings',
    to: '/settings',
    requiredAuth: true
  }
]

// Helper function to filter navigation items based on user role and device
export function filterNavItems(
  navItems: NavItem[], 
  {
    userRole,
    isMobile = false
  }: {
    userRole?: UserRole,
    isMobile?: boolean
  }
): NavItem[] {
  return navItems.filter(item => {
    // Filter by role
    const hasPermission = !item.roles || !userRole || item.roles.includes(userRole)
    
    // Filter by device
    const showOnDevice = isMobile 
      ? !item.desktopOnly
      : !item.mobileOnly

    return hasPermission && showOnDevice
  })
}
