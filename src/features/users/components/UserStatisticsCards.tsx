import { Users, ShieldCheck, UserCog, User, Receipt, Banknote, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStatistics } from "@/types/User";
import { Badge } from "@/components/ui/badge";

interface UserStatisticsCardsProps {
    statistics?: UserStatistics;
    isPending?: boolean;
}

export function UserStatisticsCards({ statistics, isPending }: UserStatisticsCardsProps) {
    const statsConfig = [
        {
            title: "الكل",
            value: statistics?.total_users,
            icon: Users,
            color: "text-chart-3",
            bgColor: "bg-chart-3/[0.06] dark:bg-chart-3/20",
            bgColor2: "bg-chart-3/10 dark:bg-chart-3/20",
            borderColor: "border-chart-3/20 dark:border-chart-3/40",
        },
        {
            title: "الادمن",
            value: statistics?.admin_count,
            icon: ShieldCheck,
            color: "text-chart-1",
            bgColor: "bg-chart-1/[0.06] dark:bg-chart-1/20",
            bgColor2: "bg-chart-1/10 dark:bg-chart-1/20",
            borderColor: "border-chart-1/20 dark:border-chart-1/40",
        },
        {
            title: "المدراء",
            value: statistics?.manager_count,
            icon: UserCog,
            color: "text-chart-5",
            bgColor: "bg-chart-5/[0.06] dark:bg-chart-5/20",
            bgColor2: "bg-chart-5/10 dark:bg-chart-5/20",
            borderColor: "border-chart-5/20 dark:border-chart-5/40",
        },
        {
            title: "الموظفين",
            value: statistics?.employee_count,
            icon: User,
            color: "text-chart-4",
            bgColor: "bg-chart-4/[0.06] dark:bg-chart-4/20",
            bgColor2: "bg-chart-4/10 dark:bg-chart-4/20",
            borderColor: "border-chart-4/20 dark:border-chart-4/40",
        },
        {
            title: "المكلفين",
            value: statistics?.tax_payer_count,
            icon: Receipt,
            color: "text-chart-6",
            bgColor: "bg-chart-6/[0.06] dark:bg-chart-6/20",
            bgColor2: "bg-chart-6/10 dark:bg-chart-6/20",
            borderColor: "border-chart-6/20 dark:border-chart-6/40",
        },
        {
            title: "مدراء المأمورين",
            value: statistics?.collectors_manager_count,
            icon: Banknote,
            color: "text-chart-2",
            bgColor: "bg-chart-2/[0.06] dark:bg-chart-2/20",
            bgColor2: "bg-chart-2/10 dark:bg-chart-2/20",
            borderColor: "border-chart-2/20 dark:border-chart-2/40",
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
