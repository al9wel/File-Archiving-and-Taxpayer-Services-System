import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useRef, memo } from "react";
import ScrollChapter from "@/landing/components/fx/ScrollChapter";
import SectionLabel from "@/landing/components/shared/SectionLabel";
import { ECOSYSTEM_MODULES } from "@/landing/content/ecosystem";
import { SECTION_LABELS } from "@/landing/content/shared";

const center = { x: 50, y: 50 };
const radius = 30;
const positionedModules = ECOSYSTEM_MODULES.map((m, i) => {
    const angle = (i / ECOSYSTEM_MODULES.length) * Math.PI * 2 - Math.PI / 2;
    return { ...m, px: 50 + radius * Math.cos(angle), py: 50 + radius * Math.sin(angle) };
});

const primaryColor = "var(--color-primary)";

const ModuleNode = memo(function ModuleNode({
    mod,
    px,
    py,
    i,
    isHovered,
    isTapped,
    onHover,
    onLeave,
    onClick,
}: {
    mod: typeof positionedModules[number];
    px: number;
    py: number;
    i: number;
    isHovered: boolean;
    isTapped: boolean;
    onHover: () => void;
    onLeave: () => void;
    onClick: () => void;
}) {
    const Icon = mod.icon;
    const isActive = isHovered || isTapped;
    return (
        <div className="absolute z-10" style={{ left: `${px}%`, top: `${py}%` }}>
            <motion.div
                className="flex flex-col items-center gap-2 cursor-pointer"
                style={{ x: "-50%", y: "-50%" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                onClick={onClick}
                animate={{ y: isActive ? -6 : 0 }}
            >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${isActive ? "shadow-md" : ""}`}
                    style={{
                        borderColor: isActive ? `color-mix(in srgb, ${primaryColor} 30%, transparent 70%)` : "var(--landing-line)",
                        backgroundColor: isActive ? `color-mix(in srgb, ${primaryColor} 6%, transparent 94%)` : "var(--landing-bg-soft)/60",
                    }}>
                    <Icon className="w-5 h-5" style={{ color: isActive ? primaryColor : "var(--landing-text-muted)" }} />
                </div>
                <span className={`text-[10px] font-medium whitespace-nowrap transition-colors ${isActive ? "font-bold" : ""}`}
                    style={{ color: isActive ? primaryColor : "var(--landing-text-muted)" }}>
                    {mod.label}
                </span>
            </motion.div>

            {/* Floating popover */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-4 rounded-xl border shadow-lg backdrop-blur-md z-20"
                        style={{
                            backgroundColor: "var(--landing-bg-soft)",
                            borderColor: `color-mix(in srgb, ${primaryColor} 15%, transparent 85%)`,
                        }}
                    >
                        <p className="text-sm font-bold text-[var(--landing-text)] mb-1">{mod.label}</p>
                        <p className="text-xs text-[var(--landing-text-muted)] mb-1.5">{mod.desc}</p>
                        <p className="text-[10px] leading-relaxed" style={{ color: primaryColor }}>{mod.purpose}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default function EcosystemMap() {
    // Separate states: hover for desktop, tap for mobile
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [tappedId, setTappedId] = useState<number | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 30, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 25 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mouseX.set(((e.clientX - cx) / cx) * 4);
            mouseY.set(((e.clientY - cy) / cy) * 4);
        };
        window.addEventListener("mousemove", handleMouse, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    // Close tap popover on outside pointerdown
    useEffect(() => {
        const handlePointerDown = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                // Only clear tap state if click is outside the entire ecosystem container
                const target = e.target as HTMLElement;
                if (!target.closest("[data-ecosystem-node]")) {
                    setTappedId(null);
                }
            }
        };
        if (tappedId !== null) {
            window.addEventListener("pointerdown", handlePointerDown);
            return () => window.removeEventListener("pointerdown", handlePointerDown);
        }
    }, [tappedId]);

    return (
        <ScrollChapter className="relative py-32 overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#b5aca1]/20 to-transparent" />
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, var(--landing-text) 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.03 }} />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <SectionLabel className="mb-4">{SECTION_LABELS.ECOSYSTEM}</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-serif text-[var(--landing-text)] leading-tight mb-4">
                        كل شيء متصل.
                        <br />
                        <span className="italic" style={{ color: primaryColor }}>كل شيء متزامن.</span>
                    </h2>
                    <p className="text-[var(--landing-text-muted)] max-w-xl mx-auto text-base">ثماني وحدات أساسية تعمل معاً كنظام عصبي رقمي موحد.</p>
                </div>

                <motion.div ref={popoverRef} className="relative max-w-2xl mx-auto aspect-square" style={{ rotateX: springX, rotateY: springY, perspective: 1000 }}>
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                        {positionedModules.map((m, i) => (
                            <motion.line
                                key={i}
                                x1={center.x} y1={center.y} x2={m.px} y2={m.py}
                                stroke={hoveredId === i || tappedId === i || (hoveredId === null && tappedId === null) ? primaryColor : "var(--landing-line)"}
                                strokeWidth={hoveredId === i || tappedId === i ? 1 : 0.4}
                                strokeDasharray="2 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                style={{ opacity: hoveredId === i || tappedId === i ? 0.5 : 0.15 }}
                            />
                        ))}
                        <circle cx={center.x} cy={center.y} r={radius} fill="none" stroke={primaryColor} strokeWidth="0.2" strokeDasharray="1 3" opacity={0.15} />
                    </svg>

                    <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                            <span className="text-white text-xs font-bold tracking-wider">النواة</span>
                        </div>
                        <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 30%, transparent 70%)` }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                    </motion.div>

                    {positionedModules.map((m, i) => (
                        <div key={m.label} data-ecosystem-node="">
                            <ModuleNode
                                mod={m}
                                px={m.px}
                                py={m.py}
                                i={i}
                                isHovered={hoveredId === i}
                                isTapped={tappedId === i}
                                onHover={() => setHoveredId(i)}
                                onLeave={() => setHoveredId(null)}
                                onClick={() => setTappedId(tappedId === i ? null : i)}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </ScrollChapter>
    );
}