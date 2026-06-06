import { MessageCircle, MessageSquare, CheckCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CustomerServiceStatisticsCards() {
    const statsConfig = [
        {
            title: "إجمالي المحادثات",
            value: 3,
            icon: MessageCircle,
            color: "text-blue-600/40 dark:text-blue-400",
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
        },
        {
            title: "محادثات نشطة",
            value: 45,
            icon: MessageSquare,
            color: "text-rose-600/40 dark:text-rose-400",
            bgColor: "bg-rose-100 dark:bg-rose-900/20",
        },
        {
            title: "محادثات مغلقة",
            value: 1180,
            icon: CheckCheck,
            color: "text-emerald-600/40 dark:text-emerald-400",
            bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
        },
        {
            title: "محادثات معلقة",
            value: 25,
            icon: Clock,
            color: "text-amber-600/40 dark:text-amber-400",
            bgColor: "bg-amber-100 dark:bg-amber-900/20",
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
