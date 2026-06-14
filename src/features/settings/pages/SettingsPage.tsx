import DashboardHeader from "@/components/layout/DahsboardHeader";
import { useAuth } from "@/hooks/useAuth";
import ChangePasswordForm from "../components/ChangePasswordForm";
import UserProfileCard from "../components/UserProfileCard";

export default function SettingsPage() {
    const { user } = useAuth();


    return (
        <div className="w-full px-3 py-3" dir="rtl">
            <DashboardHeader
                mb="mb-4"
                title="الإعدادات"
                desc="إدارة معلومات الحساب وكلمة المرور"
            />
            <div className="flex w-full flex-col gap-5 animate-in fade-in duration-500">
                <UserProfileCard user={user} isLoading={false} />
                <ChangePasswordForm />
            </div>
        </div>
    );
}
