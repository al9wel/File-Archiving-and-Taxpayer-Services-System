import { motion } from "motion/react";
import { User, Code2, Server, Smartphone, Palette } from "lucide-react";
import SectionLabel from "@/landing/components/shared/SectionLabel";

const team = [
    { role: "مدير المشروع", name: "أحمد الوائلي", icon: User, accent: "var(--landing-accent)" },
    { role: "مطور واجهات أمامية", name: "محمد السياغي", icon: Code2, accent: "#2e6b5e" },
    { role: "مطور خلفية", name: "عبدالرحمن الحمادي", icon: Server, accent: "#5b4a8a" },
    { role: "مطور تطبيقات جوالة", name: "علي الطيب", icon: Smartphone, accent: "#b8862d" },
    { role: "مصمم واجهات", name: "يوسف الحاج", icon: Palette, accent: "#3a6b8a" },
];

export default function TeamCredits() {
    return (
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <SectionLabel className="mb-4">فريق التطوير</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl text-[var(--landing-text)] leading-tight mb-4">
                        اليد التي بنت
                        <br />
                        <span className="text-[var(--landing-accent)] italic">المنصة.</span>
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute right-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, var(--landing-accent), transparent)", opacity: 0.2 }} />

                    <div className="space-y-0">
                        {team.map((member, i) => {
                            const Icon = member.icon;
                            return (
                                <motion.div
                                    key={member.role}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative flex items-center gap-8 py-8 group"
                                >
                                    <div
                                        className="relative z-10 w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500"
                                        style={{
                                            borderColor: `color-mix(in srgb, ${member.accent} 40%, transparent 60%)`,
                                            backgroundColor: `color-mix(in srgb, ${member.accent} 8%, var(--landing-bg-soft) 92%)`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: member.accent }} />
                                        <div
                                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md"
                                            style={{ backgroundColor: member.accent }}
                                        />
                                    </div>
                                    <div className="flex-1" style={{ borderBottom: "1px solid var(--landing-line)", paddingBottom: "2rem" }}>
                                        <p className="text-xs font-medium uppercase tracking-[0.2em] mb-1.5" style={{ color: member.accent }}>
                                            {member.role}
                                        </p>
                                        <p className="text-xl sm:text-2xl font-semibold text-[var(--landing-text)] group-hover:text-[var(--landing-accent)] transition-colors duration-300">
                                            {member.name}
                                        </p>
                                    </div>
                                    <span
                                        className="text-6xl sm:text-7xl font-bold select-none"
                                        style={{ color: member.accent, opacity: 0.04 }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <p className="text-[var(--landing-text-muted)]/30 text-xs uppercase tracking-[0.3em]">
                        ✦ صُمم ونُفذ بإتقان ✦
                    </p>
                </motion.div>
            </div>
        </section>
    );
}