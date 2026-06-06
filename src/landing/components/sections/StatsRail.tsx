import { motion } from "motion/react";
import { FileArchive, Users, FileText, Briefcase } from "lucide-react";
import CountUp from "@/landing/components/fx/CountUp";
import SectionLabel from "@/landing/components/shared/SectionLabel";

const stats = [
    { icon: FileArchive, value: 2000, suffix: "+", label: "ملف", sub: "تمت أرشفتها", color: "var(--landing-accent)" },
    { icon: Users, value: 1500, suffix: "+", label: "مكلف", sub: "مسجل في النظام", color: "#2e6b5e" },
    { icon: FileText, value: 300, suffix: "+", label: "طلب", sub: "قيد المعالجة", color: "#b8862d" },
    { icon: Briefcase, value: 50, suffix: "+", label: "موظف", sub: "يديرون المنصة", color: "#3a6b8a" },
];

export default function StatsRail() {
    return (
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            {/* Depth layers */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[#d4cdc3]/40 via-transparent to-[#b5aca1]/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8a3a18]/3 blur-[180px]" />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, var(--landing-text) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                    opacity: 0.025,
                }}
            />

            <div className="relative max-w-5xl mx-auto px-6">
                <div className="text-center mb-20">
                    <SectionLabel className="mb-4">أثر المنصة</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl text-[var(--landing-text)] leading-tight mb-4">
                        الأرقام التي
                        <br />
                        <span className="text-[var(--landing-accent)] italic">تتحدث.</span>
                    </h2>
                </div>

                {/* Floating cluster */}
                <div className="relative max-w-lg mx-auto aspect-square">
                    {/* Connection lines */}
                    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                        <motion.path
                            d="M200 30 L370 200 L200 370 L30 200 Z"
                            fill="none"
                            stroke="var(--landing-accent)"
                            strokeWidth="0.5"
                            strokeDasharray="4 6"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.2 }}
                            transition={{ duration: 2 }}
                        />
                        <motion.path
                            d="M200 30 L200 370 M30 200 L370 200"
                            fill="none"
                            stroke="var(--landing-accent)"
                            strokeWidth="0.3"
                            strokeDasharray="2 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    </svg>

                    {/* Center label */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-sm font-medium text-[var(--landing-text-muted)]">نمو النظام</p>
                        <p className="text-xs text-[var(--landing-text-muted)]/50">2026</p>
                    </motion.div>

                    {/* Stat positions in diamond layout */}
                    {stats.map((stat, i) => {
                        const positions = [
                            { x: "50%", y: "8%" },    // top
                            { x: "88%", y: "50%" },    // right
                            { x: "50%", y: "92%" },    // bottom
                            { x: "12%", y: "50%" },    // left
                        ];
                        const pos = positions[i];
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                className="absolute -translate-x-1/2 -translate-y-1/2 text-center group"
                                style={{ left: pos.x, top: pos.y }}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.2,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <motion.div
                                    className="relative cursor-default"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:shadow-lg"
                                        style={{
                                            backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent 88%)`,
                                        }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>

                                    {/* Number */}
                                    <CountUp
                                        to={stat.value}
                                        suffix={stat.suffix}
                                        className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--landing-text)]"
                                        duration={2}
                                        delay={i * 0.2}
                                    />

                                    {/* Label */}
                                    <p className="text-sm font-medium text-[var(--landing-text)] mt-1">{stat.label}</p>
                                    <p className="text-xs text-[var(--landing-text-muted)]/60">{stat.sub}</p>

                                    {/* Pulse dot */}
                                    <span
                                        className="w-1.5 h-1.5 rounded-full animate-pulse block mx-auto mt-2"
                                        style={{ backgroundColor: stat.color, opacity: 0.5 }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Scroll hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-xs text-[var(--landing-text-muted)]/30 mt-10 uppercase tracking-widest"
                >
                    أرقام حية من المنصة
                </motion.p>
            </div>
        </section>
    );
}