import { Building2, Activity, CreditCard, Navigation, Map, Loader2 } from "lucide-react";
import { Card, CardContent, } from "@/components/ui/card";
import { useBasicInfoStats } from "../hooks/basic-info/useBasicInfoStats";
import { Button } from "@/components/ui/button";

const stats = [
    { title: "عدد الأقسام", value: "departments_count", icon: Building2, color: "bg-emerald-50 text-emerald-600", iconBg: "bg-emerald-100" },
    { title: "عدد الأنشطة", value: "activities_types_count", icon: Activity, color: "bg-blue-50 text-blue-600", iconBg: "bg-blue-100" },
    { title: "عدد المناطق", value: "regions_count", icon: Navigation, color: "bg-orange-50 text-orange-600", iconBg: "bg-orange-100" },
    { title: "أنواع السداد", value: "payments_types_count", icon: CreditCard, color: "bg-pink-50 text-pink-600", iconBg: "bg-pink-100" },
    { title: "عدد الأحياء", value: "districts_count", icon: Map, color: "bg-gray-50 text-gray-600", iconBg: "bg-gray-100" },
];

const BasicInfo = () => {
    const { data: statsData, isLoading, isError } = useBasicInfoStats();
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <p className="text-red-600 font-bold">حدث خطأ أثناء تحميل البيانات</p>
                <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
            </div>
        );
    }
    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500" >
                    {
                        stats.slice(0, 4).map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.title} className=" overflow-hidden">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-foreground/70 mb-1">{stat.title}</p>
                                            <h3 className="text-2xl font-bold text-foreground/90">{statsData?.data?.[stat.value]}</h3>
                                        </div>
                                        <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                                            <Icon className={`size-6 ${stat.color.split(' ')[1]}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    }

                    {/* Full width card for the last stat if odd number, or just as per image layout */}
                    <Card className="md:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="text-right">
                                <p className="text-xl font-bold text-foreground/70 mb-1">{stats[4].title}</p>
                                <h3 className="text-2xl font-bold text-foreground/90">{statsData?.data?.[stats[4].value]}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stats[4].iconBg}`}>
                                {(() => {
                                    const Icon = stats[4].icon;
                                    return <Icon className={`size-6 ${stats[4].color.split(' ')[1]}`} />;
                                })()}
                            </div>
                        </CardContent>
                    </Card>


                </div >
            )}
        </>

    );
};

export default BasicInfo;

