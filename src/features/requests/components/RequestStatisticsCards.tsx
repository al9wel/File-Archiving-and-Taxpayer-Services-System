import { Clock, CheckCircle2, Archive, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function RequestStatisticsCards() {
    const statsConfig = [
        {
            title: "الطلبات المعلقة",
            value: 2,
            icon: Clock,
            color: "text-amber-600/40 dark:text-amber-400",
            bgColor: "bg-amber-100 dark:bg-amber-900/20",
        },
        {
            title: "الطلبات المؤكدة",
            value: 3,
            icon: CheckCircle2,
            color: "text-emerald-600/40 dark:text-emerald-400",
            bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
        },
        {
            title: "الطلبات المرحلة",
            value: 2,
            icon: Archive,
            color: "text-slate-600/40 dark:text-slate-400",
            bgColor: "bg-slate-100 dark:bg-slate-900/20",
        },
        {
            title: "الطلبات المرفوضة",
            value: 4,
            icon: XCircle,
            color: "text-rose-600/40 dark:text-rose-400",
            bgColor: "bg-rose-100 dark:bg-rose-900/20",
        },
    ];

    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-4">
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
