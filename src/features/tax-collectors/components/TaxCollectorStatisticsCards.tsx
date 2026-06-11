import { Users, Briefcase, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { SectionStatistics } from "@/types/SectionStatistics";

interface TaxCollectorStatisticsCardsProps {
    statistics?: SectionStatistics["tax_collectors_and_job_types"];
    isPending?: boolean;
}

export function TaxCollectorStatisticsCards({ statistics, isPending }: TaxCollectorStatisticsCardsProps) {
    const statsConfig = [
        {
            title: "إجمالي المأمورين",
            value: statistics?.total_tax_collectors,
            icon: Users,
            color: "text-chart-3",
            bgColor: "bg-chart-3/10 dark:bg-chart-3/20",
        },
        {
            title: "أنواع التوظيف",
            value: statistics?.total_job_types,
            icon: Briefcase,
            color: "text-chart-5",
            bgColor: "bg-chart-5/10 dark:bg-chart-5/20",
        },
    ];

    return (
        <div className="grid gap-3 md:grid-cols-2 mb-4">
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
