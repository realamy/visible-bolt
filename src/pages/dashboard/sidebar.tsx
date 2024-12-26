import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar"
import { LayoutDashboard, LogOut } from "lucide-react"
import { dashboardNavItems, filterNavItems } from "@/config/navigation"

export function Sidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const { direction: dir } = useLanguage()
  const { user } = useAuth()
  const isRtl = dir === "rtl"

  const filteredItems = filterNavItems(dashboardNavItems, {
    userRole: user?.role,
    isMobile: false
  })

  // Separate items into main and common groups
  const mainItems = filteredItems.filter(item => 
    !['messages', 'contracts', 'notifications', 'settings'].includes(item.to.split('/').pop() || '')
  )
  
  const commonItems = filteredItems.filter(item => 
    ['messages', 'contracts', 'notifications', 'settings'].includes(item.to.split('/').pop() || '')
  )

  const renderMenuItem = (item: typeof filteredItems[0]) => (
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
          )}>{t(item.label)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <ShadcnSidebar className={cn(
      "border-r bg-card shadow-sm transition-all duration-200",
      isRtl ? "border-l border-r-0" : "border-r",
      "w-64 lg:w-72 flex flex-col h-screen"
    )}>
      <SidebarHeader className="h-16 flex items-center px-6 border-b shrink-0">
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

      <SidebarContent className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-2">
          {/* Main Navigation Section */}
          <div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {t("dashboard.nav.main")}
              </h2>
              <SidebarMenu>
                {mainItems.map(renderMenuItem)}
              </SidebarMenu>
            </div>
          </div>

          {/* Common Items Section */}
          <div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {t("dashboard.nav.common")}
              </h2>
              <SidebarMenu>
                {commonItems.map(renderMenuItem)}
              </SidebarMenu>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 mt-auto">
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            "transition-colors",
            isRtl && "flex-row-reverse"
          )}
          onClick={() => {/* Add logout handler */}}
        >
          <LogOut className="h-4 w-4" />
          <span>{t("auth.logout")}</span>
        </button>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}