import { Users, ShieldCheck, UserCog, User, Receipt, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStatistics } from "@/types/User";
import { Badge } from "@/components/ui/badge";

interface UserStatisticsCardsProps {
    statistics?: UserStatistics;
}

export function UserStatisticsCards({ statistics }: UserStatisticsCardsProps) {
    if (!statistics) return null;

    const statsConfig = [
        {
            title: "الكل",
            value: statistics.total_users,
            icon: Users,
            color: "text-blue-600/40 dark:text-blue-400",
            bgColor: "bg-blue-100/40 dark:bg-blue-900/20",
            bgColor2: "bg-blue-100 dark:bg-blue-900/20",
            borderColor: "border-blue-200/40 dark:border-blue-800",
        },
        {
            title: "الادمن",
            value: statistics.admin_count,
            icon: ShieldCheck,
            color: "text-rose-600/40 dark:text-rose-400",
            bgColor: "bg-rose-100/40 dark:bg-rose-900/20",
            bgColor2: "bg-rose-100 dark:bg-rose-900/20",
            borderColor: "border-rose-200/40 dark:border-rose-800",
        },
        {
            title: "المدراء",
            value: statistics.manager_count,
            icon: UserCog,
            color: "text-amber-600/40 dark:text-amber-400",
            bgColor: "bg-amber-100/40 dark:bg-amber-900/20",
            bgColor2: "bg-amber-100 dark:bg-amber-900/20",
            borderColor: "border-amber-200/40 dark:border-amber-800",
        },
        {
            title: "الموظفين",
            value: statistics.employee_count,
            icon: User,
            color: "text-emerald-600/40 dark:text-emerald-400",
            bgColor: "bg-emerald-100/40 dark:bg-emerald-900/20",
            bgColor2: "bg-emerald-100 dark:bg-emerald-900/20",
            borderColor: "border-emerald-200/40 dark:border-emerald-800",
        },
        {
            title: "المكلفين",
            value: statistics.tax_payer_count,
            icon: Receipt,
            color: "text-violet-600/40 dark:text-violet-400",
            bgColor: "bg-violet-100/40 dark:bg-violet-900/20",
            bgColor2: "bg-violet-100 dark:bg-violet-900/20",
            borderColor: "border-violet-200/40 dark:border-violet-800",
        },
        {
            title: "مدراء المأمورين",
            value: statistics.collectors_manager_count,
            icon: Banknote,
            color: "text-cyan-600/40 dark:text-cyan-400",
            bgColor: "bg-cyan-100/40 dark:bg-cyan-900/20",
            bgColor2: "bg-cyan-100 dark:bg-cyan-900/20",
            borderColor: "border-cyan-200/40 dark:border-cyan-800",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 mb-6">
            {statsConfig.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center flex-col justify-center border border-border bg-card rounded-sm shadow-xs p-2 px-3 transition-all duration-300 hover:bg-accent/10 hover:-translate-y-1 ",

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
