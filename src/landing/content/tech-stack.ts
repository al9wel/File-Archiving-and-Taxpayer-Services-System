import { SiReact, SiTypescript, SiFirebase, SiTailwindcss, SiPhp, SiLaravel, SiFlutter, SiShadcnui, SiReacthookform, SiReacttable, SiReactquery, SiChartdotjs, SiFramer, SiMysql, SiGit, SiGithub, SiZod, SiLaragon, SiPostman, SiReactrouter, SiDart, SiSkeleton } from "react-icons/si";
import type { IconType } from "react-icons";

export type TechCategory = "frontend" | "backend" | "mobile" | "tools";

export interface TechItem {
    name: string;
    icon: IconType | null;
    color: string;
    category: TechCategory;
}

export const TECH_ITEMS: TechItem[] = [
    // frontend
    { name: "React", icon: SiReact, color: "#61DAFB", category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
    { name: "React Router", icon: SiReactrouter, color: "#CA4245", category: "frontend" },
    { name: "TanStack Query", icon: SiReactquery, color: "#FF4154", category: "frontend" },
    { name: "TanStack Table", icon: SiReacttable, color: "#FF4154", category: "frontend" },
    { name: "React Hook Form", icon: SiReacthookform, color: "#EC5990", category: "frontend" },
    { name: "Zod", icon: SiZod, color: "#3E67B1", category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
    { name: "Shadcn UI", icon: SiShadcnui, color: "#000000", category: "frontend" },
    { name: "Recharts", icon: SiChartdotjs, color: "#22B573", category: "frontend" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF", category: "frontend" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "frontend" },
    // backend
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "backend" },
    { name: "PHP", icon: SiPhp, color: "#777BB4", category: "backend" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "backend" },
    { name: "Laravel Sanctum", icon: null, color: "#FF2D20", category: "backend" },
    { name: "Laravel ActivityLog", icon: null, color: "#FF2D20", category: "backend" },
    { name: "Laravel pdf", icon: null, color: "#FF2D20", category: "backend" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B", category: "mobile" },
    { name: "Dart", icon: SiDart, color: "#0175C2", category: "mobile" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "mobile" },
    { name: "DartZ", icon: null, color: "#0175C2", category: "mobile" },
    { name: "Firebase-Firestore", icon: null, color: "#FFCA28", category: "mobile" },
    { name: "Dio", icon: null, color: "#0175C2", category: "mobile" },
    { name: "Delight-toast", icon: null, color: "#02569B", category: "mobile" },
    { name: "Bloc State Management", icon: null, color: "#522A9F", category: "mobile" },
    { name: "Local Notifications", icon: null, color: "#02569B", category: "mobile" },
    { name: "Getit", icon: null, color: "#0175C2", category: "mobile" },
    { name: "GoRouter", icon: null, color: "#0175C2", category: "mobile" },
    { name: "Shared-Preferences", icon: null, color: "#02569B", category: "mobile" },
    { name: "Signals", icon: null, color: "#0175C2", category: "mobile" },
    { name: "Skeletonizer", icon: SiSkeleton, color: "#E0E0E0", category: "mobile" },
    // tools
    { name: "Git", icon: SiGit, color: "#F05033", category: "tools" },
    { name: "GitHub", icon: SiGithub, color: "#181717", category: "tools" },
    { name: "Apidog", icon: SiPostman, color: "#FF5C5C", category: "tools" },
    { name: "Laragon", icon: SiLaragon, color: "#0081C6", category: "tools" },
];

export const TECH_CATEGORIES: Record<TechCategory, { label: string; dot: string; desc: string }> = {
    frontend: { label: "الواجهة الأمامية", dot: "#61DAFB", desc: "أطر العمل والمكتبات التي تشغل تجربة المستخدم." },
    backend: { label: "الخلفية", dot: "#512BD4", desc: "البنية التحتية للخدمات والمنطق." },
    // database: { label: "قواعد البيانات", dot: "#CC2927", desc: "أنظمة التخزين وإدارة البيانات." },
    mobile: { label: "التطبيقات الجوال", dot: "#02569B", desc: "منصات التطوير للأجهزة المحمولة." },
    tools: { label: "الأدوات", dot: "#F05033", desc: "أدوات التحكم بالإصدارات والتشغيل." },
};

export const TECH_CATEGORY_ORDER: TechCategory[] = ["frontend", "backend", "mobile", "tools"];