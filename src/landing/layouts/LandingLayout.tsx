import { Outlet } from "react-router-dom";
import LandingNavbar from "@/landing/layouts/LandingNavbar";

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--landing-bg)" }}>
            <LandingNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default LandingLayout;