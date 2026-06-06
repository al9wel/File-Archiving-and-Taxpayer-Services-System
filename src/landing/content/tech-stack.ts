import { SiReact, SiTypescript, SiTailwindcss, SiDotnet, SiFlutter, SiShadcnui } from "react-icons/si";
import type { IconType } from "react-icons";

export type TechCategory = "frontend" | "backend" | "database" | "mobile" | "tools";

export interface TechItem {
    name: string;
    icon: IconType | null;
    color: string;
    category: TechCategory;
}

export const TECH_ITEMS: TechItem[] = [
    { name: "React", icon: SiReact, color: "#61DAFB", category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
    { name: "TanStack Query", icon: null, color: "#FF4154", category: "frontend" },
    { name: "TanStack Table", icon: null, color: "#FF4154", category: "frontend" },
    { name: "React Hook Form", icon: null, color: "#EC5990", category: "frontend" },
    { name: "Zod", icon: null, color: "#3E67B1", category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
    { name: "Shadcn UI", icon: SiShadcnui, color: "#000000", category: "frontend" },
    { name: "Framer Motion", icon: null, color: "#0055FF", category: "frontend" },
    { name: "ASP.NET Core", icon: SiDotnet, color: "#512BD4", category: "backend" },
    { name: "Entity Framework", icon: null, color: "#6B4FBB", category: "backend" },
    { name: "SQL Server", icon: null, color: "#CC2927", category: "database" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B", category: "mobile" },
    { name: "Git", icon: null, color: "#F05033", category: "tools" },
    { name: "Docker", icon: null, color: "#2496ED", category: "tools" },
];

export const TECH_CATEGORIES: Record<TechCategory, { label: string; dot: string; desc: string }> = {
    frontend: { label: "الواجهة الأمامية", dot: "#61DAFB", desc: "أطر العمل والمكتبات التي تشغل تجربة المستخدم." },
    backend: { label: "الخلفية", dot: "#512BD4", desc: "البنية التحتية للخدمات والمنطق." },
    database: { label: "قواعد البيانات", dot: "#CC2927", desc: "أنظمة التخزين وإدارة البيانات." },
    mobile: { label: "التطبيقات الجوالة", dot: "#02569B", desc: "منصات التطوير للأجهزة المحمولة." },
    tools: { label: "الأدوات", dot: "#F05033", desc: "أدوات التحكم بالإصدارات والتشغيل." },
};

export const TECH_CATEGORY_ORDER: TechCategory[] = ["frontend", "backend", "database", "mobile", "tools"];