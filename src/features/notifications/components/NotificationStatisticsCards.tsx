import { Bell, BellRing, MailOpen, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { SectionStatistics } from "@/types/SectionStatistics";

interface NotificationStatisticsCardsProps {
    statistics?: SectionStatistics["notifications"];
    isPending?: boolean;
}

export function NotificationStatisticsCards({ statistics, isPending }: NotificationStatisticsCardsProps) {
    const statsConfig = [
        {
            title: "إجمالي الإشعارات",
            value: statistics?.total_notifications,
            icon: Bell,
            color: "text-chart-3",
            bgColor: "bg-chart-3/10 dark:bg-chart-3/20",
        },
        {
            title: "إشعارات عامة",
            value: statistics?.type_counts?.General,
            icon: BellRing,
            color: "text-chart-1",
            bgColor: "bg-chart-1/10 dark:bg-chart-1/20",
        },
        {
            title: "لمستخدمي النظام",
            value: statistics?.type_counts?.ForSystemUsers,
            icon: MailOpen,
            color: "text-chart-4",
            bgColor: "bg-chart-4/10 dark:bg-chart-4/20",
        },
        {
            title: "للمكلفين",
            value: statistics?.type_counts?.ForTaxPayers,
            icon: AlertCircle,
            color: "text-chart-5",
            bgColor: "bg-chart-5/10 dark:bg-chart-5/20",
        },
        {
            title: "خاصة",
            value: statistics?.type_counts?.Special,
            icon: Sparkles,
            color: "text-chart-2",
            bgColor: "bg-chart-2/10 dark:bg-chart-2/20",
        },
    ];

    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5 mb-4">
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
                            <div className="flex items-center gap-2">
                                <div className={`${stat.bgColor} rounded-md w-6 h-6 flex items-center justify-center`}>
                                    <Icon className={cn("w-4 h-4", stat.color)} />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                            </div>
                            <Badge variant="outline" className="text-muted-foreground font-bold">
                                {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : stat.value ?? 0}
                            </Badge>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
