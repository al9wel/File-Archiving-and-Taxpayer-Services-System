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
            color: "text-chart-3",
            bgColor: "bg-chart-3/[0.06] dark:bg-chart-3/20",
            borderColor: "border-chart-3/20 dark:border-chart-3/40",
        },
        {
            title: "داخل الأرشيف",
            value: statistics.inside_archive_count,
            icon: Archive,
            color: "text-chart-4",
            bgColor: "bg-chart-4/[0.06] dark:bg-chart-4/20",
            borderColor: "border-chart-4/20 dark:border-chart-4/40",
        },
        {
            title: "خارج الأرشيف",
            value: statistics.outside_archive_count,
            icon: Send,
            color: "text-chart-5",
            bgColor: "bg-chart-5/[0.06] dark:bg-chart-5/20",
            borderColor: "border-chart-5/20 dark:border-chart-5/40",
        },
        {
            title: "مفقود",
            value: statistics.missing_count,
            icon: AlertTriangle,
            color: "text-chart-1",
            bgColor: "bg-chart-1/[0.06] dark:bg-chart-1/20",
            borderColor: "border-chart-1/20 dark:border-chart-1/40",
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
                            <Badge variant="outline" className="text-muted-foreground font-bold">
                                {stat.value || 0}
                            </Badge>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
