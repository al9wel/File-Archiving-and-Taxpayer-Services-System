import NavBar from "@/components/layout/NavBar"
import SideBar from "@/components/layout/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
const MainLayout = () => {
    return (
        <SidebarProvider>
            <SideBar />
            <main className="w-full">
                <NavBar />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default MainLayout
