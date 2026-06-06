import { motion } from "motion/react";
import { useState, memo } from "react";
import { ArrowUpLeft } from "lucide-react";
import ScrollChapter from "@/landing/components/fx/ScrollChapter";
import SectionLabel from "@/landing/components/shared/SectionLabel";
import WorkflowPopover from "@/landing/components/shared/WorkflowPopover";
import { WORKFLOW_MODULES } from "@/landing/content/workflow";
import type { WorkflowModule } from "@/landing/content/workflow";
import { SECTION_LABELS } from "@/landing/content/shared";

const primaryColor = "var(--color-primary)";

const ModuleRow = memo(function ModuleRow({
    mod,
    index,
    isActive,
    onHover,
    onLeave,
    onClick,
}: {
    mod: WorkflowModule;
    index: number;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
    onClick: () => void;
}) {
    const Icon = mod.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onClick}
            className="group relative cursor-pointer"
        >
            <div
                className="relative flex items-center gap-6 py-6 border-b transition-all duration-300"
                style={{
                    borderColor: isActive ? primaryColor : "var(--landing-line)",
                }}
            >
                {/* Hover accent line (slides in from top) */}
                <div
                    className="absolute top-0 right-0 h-[2px] transition-all duration-500"
                    style={{
                        width: isActive ? "100%" : "0%",
                        backgroundColor: primaryColor,
                    }}
                />

                {/* Oversized number */}
                <span
                    className="text-6xl sm:text-7xl font-serif font-bold select-none shrink-0 transition-colors duration-500"
                    style={{ color: isActive ? primaryColor : "var(--landing-line)", opacity: isActive ? 0.5 : 0.25 }}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                        backgroundColor: isActive ? `color-mix(in srgb, ${primaryColor} 12%, transparent 88%)` : "var(--landing-bg-soft)",
                        border: `1px solid ${isActive ? `color-mix(in srgb, ${primaryColor} 30%, transparent 70%)` : "var(--landing-line)"}`,
                    }}
                >
                    <Icon className="w-6 h-6" style={{ color: isActive ? primaryColor : "var(--landing-text-muted)" }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="text-xl sm:text-2xl font-bold transition-colors duration-300 mb-1"
                        style={{ color: isActive ? primaryColor : "var(--landing-text)" }}
                    >
                        {mod.label}
                    </h3>
                    <p className="text-sm text-[var(--landing-text-muted)] leading-relaxed line-clamp-1">{mod.desc}</p>
                </div>

                {/* Step count + arrow */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: isActive ? primaryColor : "var(--landing-text-muted)" }}>
                            {String(mod.steps.length).padStart(2, "0")}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--landing-text-muted)/50" }}>خطوات</p>
                    </div>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            backgroundColor: isActive ? primaryColor : "transparent",
                            border: `1px solid ${isActive ? primaryColor : "var(--landing-line)"}`,
                            transform: isActive ? "rotate(0deg)" : "rotate(45deg)",
                        }}
                    >
                        <ArrowUpLeft className="w-4 h-4" style={{ color: isActive ? "white" : "var(--landing-text-muted)" }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export default function SystemFlow() {
    const [activeModule, setActiveModule] = useState<WorkflowModule | null>(null);

    return (
        <ScrollChapter className="relative py-32 overflow-hidden" style={{ backgroundColor: "var(--landing-bg)" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#b5aca1]/30 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="mb-16">
                    <SectionLabel className="mb-4">{SECTION_LABELS.WORKFLOW}</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-serif text-[var(--landing-text)] leading-tight mb-4 max-w-2xl">
                        رحلة الملف من البداية
                        <br />
                        <span className="italic" style={{ color: primaryColor }}>حتى الأرشفة.</span>
                    </h2>
                    <p className="text-[var(--landing-text-muted)] max-w-xl text-base">
                        تفاعل مع كل وحدة لاستكشاف خطوات العمل — تستعرض التفاصيل في نفس الصفحة.
                    </p>
                </div>

                {/* Magazine index list */}
                <div className="relative">
                    {WORKFLOW_MODULES.map((mod, i) => (
                        <ModuleRow
                            key={mod.id}
                            mod={mod}
                            index={i}
                            isActive={activeModule?.id === mod.id}
                            onHover={() => {
                                if (window.matchMedia("(hover: hover)").matches) {
                                    setActiveModule(mod);
                                }
                            }}
                            onLeave={() => {
                                if (window.matchMedia("(hover: hover)").matches) {
                                    setActiveModule(null);
                                }
                            }}
                            onClick={() => {
                                // Mobile / no-hover devices: tap toggles
                                if (!window.matchMedia("(hover: hover)").matches) {
                                    setActiveModule(activeModule?.id === mod.id ? null : mod);
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Floating inline popover (no dialog, no scroll lock) */}
                <WorkflowPopover module={activeModule} />
            </div>
        </ScrollChapter>
    );
}