import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen>
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex h-[calc(100vh-4rem)]">
          <AppSidebar />
          <SidebarInset>
            <div className="h-full p-6">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
