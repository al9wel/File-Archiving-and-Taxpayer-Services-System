import { useAuth } from "@/hooks/useAuth"
import {
    ArchitectureSection,
    FinalShowcaseSection,
    HeroSection,
    ModulesSection,
    StrengthsSection,
    TeamSection,
    TechStackSection,
    TransformationSection,
    WorkflowSection,
} from "../components/ShowcaseSections"
import "../landing.css"

const HomePage = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className="landing-showcase w-full overflow-hidden" dir="rtl">
            <HeroSection isAuthenticated={isAuthenticated} />
            <TransformationSection />
            <WorkflowSection />
            <ModulesSection />
            <TechStackSection />
            <ArchitectureSection />
            <StrengthsSection />
            <TeamSection />
            <FinalShowcaseSection isAuthenticated={isAuthenticated} />
        </div>
    )
}

export default HomePage
