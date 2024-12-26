import * as React from "react"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/contexts/language-context"
import { LayoutDashboard, Briefcase, MessageSquare, Settings, Wallet, Star, Clock } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <Sidebar className={className} {...props}>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <SidebarTrigger />
        <span className="ml-2 text-lg font-semibold">
          {t('dashboard.overview.title')}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2 p-2">
          {navigation.map((item) => {
            const isActive = item.end 
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{t(item.name)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
