import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { HERO_CONTENT } from "@/landing/content/hero";
import { useAuth } from "@/hooks/useAuth";

const primaryColor = "var(--color-primary)";

export default function HeroExperience() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            {/* Simple Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--landing-bg-soft)]/60 via-[var(--landing-bg)] to-[var(--landing-bg-deep)]/40" />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px]" style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 4%, transparent 96%)` }} />
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--landing-line) 1px, transparent 1px), linear-gradient(90deg, var(--landing-line) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
            </div>

            <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-20 text-center flex flex-col items-center gap-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                    <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-[var(--landing-text)]/90 leading-tight">
                        {HERO_CONTENT.LINES[0]}
                    </h1>
                    <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl" style={{ color: primaryColor }}>
                        {HERO_CONTENT.LINES[1]}
                    </h1>
                    <h1 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-[var(--landing-text)]/80">
                        {HERO_CONTENT.LINES[2]}
                    </h1>
                </div>

                <div className="mt-4">
                    {(() => {
                        const [desc, mission] = HERO_CONTENT.SUBTITLE.includes(" — ")
                            ? HERO_CONTENT.SUBTITLE.split(" — ")
                            : [HERO_CONTENT.SUBTITLE, ""];
                        return (
                            <div className="space-y-2">
                                <p className="text-base sm:text-lg text-[var(--landing-text)]/70 leading-relaxed max-w-2xl mx-auto">
                                    {desc}
                                </p>
                                {mission && (
                                    <p className="text-sm sm:text-base text-[var(--landing-text-muted)]/70 leading-relaxed tracking-wide">
                                        — {mission}
                                    </p>
                                )}
                            </div>
                        );
                    })()}
                </div>

                <div className="mt-8">
                    {isAuthenticated ? (
                        <NavLink
                            to={ROUTES.DASHBOARD.MAIN}
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[var(--primary-foreground)] text-base font-semibold transition-all duration-300 hover:shadow-lg hover:opacity-90"
                            style={{ backgroundColor: "var(--landing-accent)" }}
                        >
                            لوحة التحكم
                        </NavLink>
                    ) : (
                        <NavLink
                            to={ROUTES.PUBLIC.AUTH}
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[var(--primary-foreground)] text-base font-semibold transition-all duration-300 hover:shadow-lg hover:opacity-90"
                            style={{ backgroundColor: "var(--landing-accent)" }}
                        >
                            تسجيل الدخول للنظام
                        </NavLink>
                    )}
                </div>
            </div>
        </section>
    );
}