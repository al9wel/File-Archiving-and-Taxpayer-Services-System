import { Building2, Activity, CreditCard, Navigation, Map } from "lucide-react";
import { Card, CardContent, } from "@/components/ui/card";

const stats = [
    { title: "عدد الأقسام", value: "2", icon: Building2, color: "bg-emerald-50 text-emerald-600", iconBg: "bg-emerald-100" },
    { title: "عدد الأنشطة", value: "40", icon: Activity, color: "bg-blue-50 text-blue-600", iconBg: "bg-blue-100" },
    { title: "عدد المناطق", value: "23", icon: Navigation, color: "bg-orange-50 text-orange-600", iconBg: "bg-orange-100" },
    { title: "أنواع السداد", value: "2", icon: CreditCard, color: "bg-pink-50 text-pink-600", iconBg: "bg-pink-100" },
    { title: "عدد الأحياء", value: "15", icon: Map, color: "bg-gray-50 text-gray-600", iconBg: "bg-gray-100" },
];

const BasicInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {stats.slice(0, 4).map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title} className=" overflow-hidden">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="text-right">
                                <p className="text-xl font-bold text-foreground/70 mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-foreground/90">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                                <Icon className={`size-6 ${stat.color.split(' ')[1]}`} />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

            {/* Full width card for the last stat if odd number, or just as per image layout */}
            <Card className="md:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="text-right">
                        <p className="text-xl font-bold text-foreground/70 mb-1">{stats[4].title}</p>
                        <h3 className="text-2xl font-bold text-foreground/90">{stats[4].value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${stats[4].iconBg}`}>
                        {(() => {
                            const Icon = stats[4].icon;
                            return <Icon className={`size-6 ${stats[4].color.split(' ')[1]}`} />;
                        })()}
                    </div>
                </CardContent>
            </Card>


        </div>
    );
};

export default BasicInfo;

