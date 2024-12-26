import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { NavItem } from "@/config/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/language-context"
import { LayoutDashboard } from "lucide-react"

interface SidebarProps {
  items: NavItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const { t } = useTranslation()
  const { direction } = useLanguage()
  const isRtl = direction === 'rtl'

  return (
    <ShadcnSidebar
      side={isRtl ? "right" : "left"}
      collapsible="icon"
      className={cn(
        "border-r border-border/40",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="border-b border-border/40 px-6 py-3">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-2",
            "text-lg font-semibold tracking-tight",
            isRtl && "flex-row-reverse"
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>{t("brand.name")}</span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-4 py-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full",
                  isRtl && "flex-row-reverse"
                )}
              >
                <Link to={item.to}>
                  <item.icon className="h-5 w-5" />
                  <span>{t(item.label)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  )
}
