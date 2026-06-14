import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/User";
import { HashIcon, Phone, ShieldCheck, UserRound } from "lucide-react";

type ProfileUser = User & {
    email?: string | null;
};

interface UserProfileCardProps {
    user: ProfileUser | null;
    isLoading?: boolean;
}

const roleLabels: Record<string, string> = {
    Admin: "مدير النظام",
    Manager: "مدير",
    Employee: "موظف",
    Collectors_Manager: "مدير المأمورين",
    Tax_Payer: "مكلف",
};

const profileValue = (value?: string | number | null) => value || "غير متوفر";

export default function UserProfileCard({ user, isLoading }: UserProfileCardProps) {
    if (isLoading) {
        return (
            <Card className="border shadow-sm">
                <CardHeader className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-20 w-full rounded-xl" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border shadow-sm">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt="صورة المستخدم"
                            className="h-16 w-16 rounded-full border object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <UserRound className="h-8 w-8" />
                        </div>
                    )}
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">
                            {profileValue(`${user?.firstName || ""} ${user?.lastName || ""}`.trim())}
                        </h2>
                        <p className="text-sm text-muted-foreground">معلومات الحساب الشخصية والوظيفية</p>
                    </div>
                </div>
                <Badge variant="secondary" className="w-fit px-3 py-1 text-sm">
                    {roleLabels[user?.role || ""] || profileValue(user?.role)}
                </Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <ProfileItem label="الرقم" value={profileValue(user?.id)} icon={HashIcon} />
                <ProfileItem label="الاسم الكامل" value={profileValue(`${user?.firstName || ""} ${user?.lastName || ""}`.trim())} icon={UserRound} />
                <ProfileItem label="اسم المستخدم" value={profileValue(user?.userName)} icon={ShieldCheck} />
                <ProfileItem label="رقم الهاتف" value={profileValue(user?.phone)} icon={Phone} />
                <ProfileItem label="الدور" value={roleLabels[user?.role || ""] || profileValue(user?.role)} icon={ShieldCheck} />
                <ProfileItem label="القسم" value={profileValue(user?.departmentName || user?.department?.name)} icon={ShieldCheck} />
            </CardContent>
        </Card>
    );
}

interface ProfileItemProps {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
}

const ProfileItem = ({ label, value, icon: Icon }: ProfileItemProps) => (
    <div className="rounded-xl border bg-muted/20 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
        </div>
        <p className="break-words text-base font-semibold text-foreground">{value}</p>
    </div>
);
