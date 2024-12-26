import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  Wallet,
  Star,
  Clock,
} from "lucide-react"

const navigation = [
  {
    name: "dashboard.nav.overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "dashboard.nav.projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    name: "dashboard.nav.messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "dashboard.nav.earnings",
    href: "/dashboard/earnings",
    icon: Wallet,
  },
  {
    name: "dashboard.nav.reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
  {
    name: "dashboard.nav.availability",
    href: "/dashboard/availability",
    icon: Clock,
  },
  {
    name: "dashboard.nav.settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <aside className="w-64 shrink-0">
      <nav className="h-full py-4 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = item.end 
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.name)}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
