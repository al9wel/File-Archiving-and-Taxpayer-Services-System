import { Outlet } from "react-router-dom"
import LandingNavbar from "@/components/layout/LandingNavbar"
import LandingFooter from "@/components/layout/LandingFooter"

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <LandingNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <LandingFooter />
        </div>
    )
}

export default LandingLayout
