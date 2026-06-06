import { RefreshCcw, Archive, Send, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileMovementStatistics } from "@/types/FileMovments";
import { Badge } from "@/components/ui/badge";

interface FileMovementStatisticsCardsProps {
    statistics?: FileMovementStatistics;
}

export function FileMovementStatisticsCards({ statistics }: FileMovementStatisticsCardsProps) {
    if (!statistics) return null;

    const statsConfig = [
        {
            title: "إجمالي الحركات",
            value: statistics.total_movements,
            icon: RefreshCcw,
            color: "text-blue-600/40 dark:text-blue-400",
            bgColor: "bg-blue-100/40 dark:bg-blue-900/20",
            borderColor: "border-blue-200/40 dark:border-blue-800",
        },
        {
            title: "داخل الأرشيف",
            value: statistics.inside_archive_count,
            icon: Archive,
            color: "text-emerald-600/40 dark:text-emerald-400",
            bgColor: "bg-emerald-100/40 dark:bg-emerald-900/20",
            borderColor: "border-emerald-200/40 dark:border-emerald-800",
        },
        {
            title: "خارج الأرشيف",
            value: statistics.outside_archive_count,
            icon: Send,
            color: "text-amber-600/40 dark:text-amber-400",
            bgColor: "bg-amber-100/40 dark:bg-amber-900/20",
            borderColor: "border-amber-200/40 dark:border-amber-800",
        },
        {
            title: "مفقود",
            value: statistics.missing_count,
            icon: AlertTriangle,
            color: "text-rose-600/40 dark:text-rose-400",
            bgColor: "bg-rose-100/40 dark:bg-rose-900/20",
            borderColor: "border-rose-200/40 dark:border-rose-800",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {statsConfig.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center flex-col justify-center border border-border bg-card rounded-sm shadow-xs p-2 px-3 transition-all duration-300 hover:bg-accent/10 hover:-translate-y-1 "
                        )}
                    >
                        <div className="flex justify-between w-full">
                            <div className="flex items-center  gap-2">
                                <div className={`${stat.bgColor} rounded-md w-6 h-6 flex items-center justify-center`}>
                                    <Icon className={cn("w-4 h-4", stat.color)} />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                            </div>
                            <Badge variant="outline" className="text-black/60 font-bold">
                                {stat.value || 0}
                            </Badge>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
