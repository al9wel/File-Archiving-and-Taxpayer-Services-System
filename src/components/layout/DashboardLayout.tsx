import DashboardNavBar from "@/components/layout/DashboardNavBar"
import DashboardSideBar from "@/components/layout/DashboardSideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className="w-full">
                <DashboardNavBar />
                <Outlet />
            </main>
            <Toaster position="top-center" richColors />
        </SidebarProvider>
    )
}

export default DashboardLayout
