import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    italic?: boolean;
    byWord?: boolean;
}

function splitArabicGraphemes(text: string): string[] {
    try {
        const segmenter = new Intl.Segmenter("ar", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (s) => s.segment);
    } catch {
        return text.split("");
    }
}

export default function SplitText({
    text,
    className = "",
    delay = 0,
    stagger = 0.04,
    as: Tag = "h1",
    italic = false,
    byWord = false,
}: SplitTextProps) {
    const prefersReducedMotion = useReducedMotion();
    const items = useMemo(
        () => (byWord ? text.split(/(\s+)/).filter(Boolean) : splitArabicGraphemes(text)),
        [text, byWord]
    );

    // When reduced motion: render text as plain to avoid disconnected glyphs
    if (prefersReducedMotion) {
        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <Tag className={`inline-block ${className}`} aria-label={text}>
            {items.map((item, i) => (
                <motion.span
                    key={`${item}-${i}`}
                    className={`inline-block ${italic ? "italic" : ""}`}
                    initial={byWord ? { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" } : { y: 80, opacity: 0, rotateX: -40 }}
                    animate={byWord ? { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)" } : { y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                        duration: byWord ? 0.7 : 0.6,
                        delay: delay + i * stagger,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {item === " " ? "\u00A0" : item}
                </motion.span>
            ))}
        </Tag>
    );
}