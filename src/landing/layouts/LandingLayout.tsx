import { Outlet } from "react-router-dom";
import LandingNavbar from "@/landing/layouts/LandingNavbar";
import NoiseOverlay from "../components/fx/NoiseOverlay";

const LandingLayout = () => {
    return (
        <div className="relative min-h-screen flex flex-col" style={{ backgroundColor: "var(--landing-bg)" }}>
            <NoiseOverlay opacity={0.09} />
            <LandingNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default LandingLayout;