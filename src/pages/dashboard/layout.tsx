import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { 
  // Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarProvider, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Sidebar } from "./sidebar"
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Wallet, 
  Star, 
  Clock,
  Users,
  FileText,
  Search
} from "lucide-react"
import { Link, useLocation, Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/sign-in" replace />
  }

  const freelancerMenuItems = [
    {
      icon: LayoutDashboard,
      label: t("dashboard.nav.overview"),
      to: "/dashboard",
    },
    {
      icon: Briefcase,
      label: t("dashboard.nav.projects"),
      to: "/dashboard/projects",
    },
    {
      icon: MessageSquare,
      label: t("dashboard.nav.messages"),
      to: "/dashboard/messages",
    },
    {
      icon: Wallet,
      label: t("dashboard.nav.earnings"),
      to: "/dashboard/earnings",
    },
    {
      icon: Star,
      label: t("dashboard.nav.reviews"),
      to: "/dashboard/reviews",
    },
  ]

  const clientMenuItems = [
    {
      icon: LayoutDashboard,
      label: t("dashboard.nav.overview"),
      to: "/dashboard",
    },
    {
      icon: Briefcase,
      label: t("dashboard.nav.projects"),
      to: "/dashboard/projects",
    },
    {
      icon: MessageSquare,
      label: t("dashboard.nav.messages"),
      to: "/dashboard/messages",
    },
    {
      icon: Users, 
      label: t("dashboard.nav.freelancers"),
      to: "/dashboard/freelancers",
    },
    {
      icon: FileText,
      label: t("dashboard.nav.contracts"),
      to: "/dashboard/contracts",
    },
  ]

  const menuItems = user.role === 'freelancer' ? freelancerMenuItems : clientMenuItems

  const commonMenuItems = [
    {
      icon: Settings,
      label: t("dashboard.nav.settings"),
      to: "/dashboard/settings",
    },
  ]

  return (
    <SidebarProvider >
      <div className={cn(
        "flex h-screen bg-background/95 antialiased",
        isRtl && "flex-row-reverse"
      )}>
        <Sidebar />
        {/* <Sidebar className={cn(
          "border-r bg-card shadow-sm transition-all duration-200",
          isRtl ? "border-l border-r-0" : "border-r",
          "w-64 lg:w-72"
        )}>
          <SidebarHeader className="h-16 flex items-center px-6 border-b">
            <SidebarTrigger className="lg:hidden" />
            <Link to="/dashboard" className={cn(
              "flex items-center gap-2",
              isRtl && "flex-row-reverse"
            )}>
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {t("brand.name")}
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.to} className="my-0.5">
                  <SidebarMenuButton
                    asChild
                    active={location.pathname === item.to}
                    className={cn(
                      "w-full px-3 py-2 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      isRtl && "flex-row-reverse text-right"
                    )}
                  >
                    <Link to={item.to} className="flex items-center gap-3 w-full">
                      <item.icon className={cn(
                        "h-4 w-4 shrink-0",
                        location.pathname === item.to ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "flex-1",
                        location.pathname === item.to ? "font-medium text-primary" : "text-muted-foreground"
                      )}>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="my-4 border-t" />
              {commonMenuItems.map((item) => (
                <SidebarMenuItem key={item.to} className="my-0.5">
                  <SidebarMenuButton
                    asChild
                    active={location.pathname === item.to}
                    className={cn(
                      "w-full px-3 py-2 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      isRtl && "flex-row-reverse text-right"
                    )}
                  >
                    <Link to={item.to} className="flex items-center gap-3 w-full">
                      <item.icon className={cn(
                        "h-4 w-4 shrink-0",
                        location.pathname === item.to ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "flex-1",
                        location.pathname === item.to ? "font-medium text-primary" : "text-muted-foreground"
                      )}>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar> */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="h-full px-4 py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
