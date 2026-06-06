import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Magnetic from "@/landing/components/fx/Magnetic";
import { NavLink } from "react-router-dom";
import { CTA } from "@/landing/content/shared";

const primaryColor = "var(--color-primary)";

export default function ClosingScene() {
    const text = "بُني لتحديث الإدارة الضريبية.";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{ background: `conic-gradient(from 0deg, ${primaryColor}, transparent, ${primaryColor})`, filter: "blur(150px)", opacity: 0.08 }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full top-1/4 right-1/4"
                style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)`, filter: "blur(100px)", opacity: 0.06 }}
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--landing-line) 1px, transparent 1px), linear-gradient(90deg, var(--landing-line) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                {/* Single motion wrapper around the Arabic block — no per-glyph/word animation */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.5rem,8vw,7rem)] font-serif tracking-tight mb-10"
                    style={{ lineHeight: "0.9", color: "var(--landing-text)" }}
                >
                    {text}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center gap-4 text-sm mb-12"
                    style={{ color: "var(--landing-text-muted)/40" }}
                >
                    <span>v1.0</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--landing-text-muted)/20" }} />
                    <span>2026</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--landing-text-muted)/20" }} />
                    <span>صُمم في اليمن</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Magnetic strength={0.2}>
                        <NavLink to="auth" className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: primaryColor }}>
                            <span>{CTA.ENTER_SYSTEM}</span>
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </NavLink>
                    </Magnetic>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <p className="text-xs tracking-[0.2em]" style={{ color: "var(--landing-text-muted)/15" }}>
                        نظام الأرشفة الرقمية وخدمات دافعي الضرائب
                    </p>
                </motion.div>
            </div>
        </section>
    );
}