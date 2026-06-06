import { FileArchive, Users, FileText, Briefcase } from "lucide-react";

export interface StatItem {
    icon: typeof FileArchive;
    value: number;
    suffix: string;
    label: string;
    sub: string;
}

export const STATS_ITEMS: StatItem[] = [
    { icon: FileArchive, value: 2000, suffix: "+", label: "ملف", sub: "تمت أرشفتها" },
    { icon: Users, value: 1500, suffix: "+", label: "مكلف", sub: "مسجل في النظام" },
    { icon: FileText, value: 300, suffix: "+", label: "طلب", sub: "قيد المعالجة" },
    { icon: Briefcase, value: 50, suffix: "+", label: "موظف", sub: "يديرون المنصة" },
];