import DashboardNavBar from "@/components/layout/DashboardNavBar"
import DashboardSideBar from "@/components/layout/DashboardSideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { useAuthMe } from "@/features/auth/hooks/useAuthMe"
import { Loader2 } from "lucide-react"

const DashboardLayout = () => {
    const { isLoading } = useAuthMe();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

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
