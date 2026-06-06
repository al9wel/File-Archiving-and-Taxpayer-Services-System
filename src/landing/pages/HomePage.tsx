import { lazy, Suspense } from "react";
import NoiseOverlay from "@/landing/components/fx/NoiseOverlay";

const HeroExperience = lazy(() => import("@/landing/components/sections/HeroExperience"));
const SystemFlow = lazy(() => import("@/landing/components/sections/SystemFlow"));
const EcosystemMap = lazy(() => import("@/landing/components/sections/EcosystemMap"));
const TechStack = lazy(() => import("@/landing/components/sections/TechStack"));
const TeamCredits = lazy(() => import("@/landing/components/sections/TeamCredits"));
const StatsRail = lazy(() => import("@/landing/components/sections/StatsRail"));
const ClosingScene = lazy(() => import("@/landing/components/sections/ClosingScene"));

function SectionFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--landing-bg)" }}>
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "var(--landing-accent)/30", borderTopColor: "var(--landing-accent)" }} />
        </div>
    );
}

const HomePage = () => {
    return (
        <div className="relative text-[var(--landing-text)]/80" style={{ backgroundColor: "var(--landing-bg)" }} dir="rtl">
            <NoiseOverlay opacity={0.1} />

            <Suspense fallback={<SectionFallback />}>
                <HeroExperience />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <SystemFlow />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <EcosystemMap />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <TechStack />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <StatsRail />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <TeamCredits />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
                <ClosingScene />
            </Suspense>
        </div>
    );
};

export default HomePage;