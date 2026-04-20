import DashboardNavBar from "@/components/layout/DashboardNavBar"
import DashboardSideBar from "@/components/layout/DashboardSideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className="w-full">
                <DashboardNavBar />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
