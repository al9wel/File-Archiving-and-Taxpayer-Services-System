import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "../hooks/useChangePassword";
import type { ChangePasswordPayload } from "@/types/Settings";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const defaultValues: ChangePasswordFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

export default function ChangePasswordForm() {
    const [visibleFields, setVisibleFields] = useState<Record<keyof ChangePasswordFormValues, boolean>>({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const changePassword = useChangePassword();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues,
    });

    const toggleVisibility = (field: keyof ChangePasswordFormValues) => {
        setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
    };

    const onSubmit = (values: ChangePasswordPayload) => {
        changePassword.mutate(values, {
            onSuccess: () => form.reset(defaultValues),
        });
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">تغيير كلمة المرور</h2>
                        <p className="text-sm text-muted-foreground">استخدم كلمة مرور قوية للحفاظ على أمان حسابك</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <PasswordField
                            control={form.control}
                            name="currentPassword"
                            label="كلمة المرور الحالية"
                            isVisible={visibleFields.currentPassword}
                            onToggleVisibility={() => toggleVisibility("currentPassword")}
                        />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <PasswordField
                                control={form.control}
                                name="newPassword"
                                label="كلمة المرور الجديدة"
                                isVisible={visibleFields.newPassword}
                                onToggleVisibility={() => toggleVisibility("newPassword")}
                            />
                            <PasswordField
                                control={form.control}
                                name="confirmPassword"
                                label="تأكيد كلمة المرور"
                                isVisible={visibleFields.confirmPassword}
                                onToggleVisibility={() => toggleVisibility("confirmPassword")}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 w-full font-bold md:w-auto md:px-10"
                            disabled={changePassword.isPending}
                        >
                            {changePassword.isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Save className="h-5 w-5" />
                            )}
                            {changePassword.isPending ? "جاري الحفظ..." : "حفظ كلمة المرور"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

interface PasswordFieldProps {
    control: ReturnType<typeof useForm<ChangePasswordFormValues>>["control"];
    name: keyof ChangePasswordFormValues;
    label: string;
    isVisible: boolean;
    onToggleVisibility: () => void;
}

const PasswordField = ({ control, name, label, isVisible, onToggleVisibility }: PasswordFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input
                            {...field}
                            type={isVisible ? "text" : "password"}
                            className="h-12 bg-muted/30 pl-11"
                            autoComplete="new-password"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-1 top-1/2 h-9 w-9 -translate-y-1/2"
                            onClick={onToggleVisibility}
                            aria-label={isVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        >
                            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);
