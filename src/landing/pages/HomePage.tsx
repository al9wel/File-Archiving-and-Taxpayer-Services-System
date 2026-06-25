import HeroExperience from "@/landing/components/sections/HeroExperience";

const HomePage = () => {
    return (
        <div className="relative text-[var(--landing-text)]/80 flex flex-col min-h-screen pt-16" style={{ backgroundColor: "var(--landing-bg)" }} dir="rtl">
            <HeroExperience />
        </div>
    );
};

export default HomePage;