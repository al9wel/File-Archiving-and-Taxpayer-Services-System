import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    duration?: number;
    distance?: number;
    once?: boolean;
    as?: "div" | "section" | "article" | "span";
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.7,
    distance = 60,
    once = true,
    as = "div",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-80px" });

    const getInitial = () => {
        switch (direction) {
            case "up": return { y: distance, opacity: 0 };
            case "down": return { y: -distance, opacity: 0 };
            case "left": return { x: distance, opacity: 0 };
            case "right": return { x: -distance, opacity: 0 };
            case "none": return { opacity: 0 };
        }
    };

    const MotionTag = motion[as as keyof typeof motion] as React.ElementType;

    return (
        <MotionTag
            ref={ref}
            className={className}
            initial={getInitial()}
            animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitial()}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </MotionTag>
    );
}