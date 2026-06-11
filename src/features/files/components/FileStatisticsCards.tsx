import { FileText, Paperclip, Building, Loader2, HeartHandshake, PersonStanding } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { SectionStatistics } from "@/types/SectionStatistics";

interface FileStatisticsCardsProps {
    statistics?: SectionStatistics["files"];
    isPending?: boolean;
}

export function FileStatisticsCards({ statistics, isPending }: FileStatisticsCardsProps) {
    const statsConfig = [
        {
            title: "إجمالي الملفات",
            value: statistics?.total_files,
            icon: FileText,
            color: "text-chart-3",
            bgColor: "bg-chart-3/10 dark:bg-chart-3/20",
        },
        {
            title: "ملفات فردية",
            value: statistics?.individual_files,
            icon: PersonStanding,
            color: "text-chart-5",
            bgColor: "bg-chart-5/10 dark:bg-chart-5/20",
        },
        {
            title: "ملفات شركات",
            value: statistics?.company_files,
            icon: Building,
            color: "text-chart-1",
            bgColor: "bg-chart-1/10 dark:bg-chart-1/20",
        },
        {
            title: "ملفات شركات خيرية",
            value: statistics?.charitable_company_files,
            icon: HeartHandshake,
            color: "text-chart-2",
            bgColor: "bg-chart-2/10 dark:bg-chart-2/20",
        },
        {
            title: "الملحقات",
            value: statistics?.total_attachments,
            icon: Paperclip,
            color: "text-chart-4",
            bgColor: "bg-chart-4/10 dark:bg-chart-4/20",
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
