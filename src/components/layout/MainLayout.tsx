import NavBar from "@/components/layout/NavBar"
import SideBar from "@/components/layout/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
const MainLayout = () => {
    return (
        <SidebarProvider>
            <SideBar />
            <main className="w-full">
                <NavBar />
            </main>
        </SidebarProvider>
    )
}

export default MainLayout
