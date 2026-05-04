import { useState } from "react"
import { useResetPassword } from "../hooks/useResetPassword"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/components/ui/button"
import { Loader2, Lock, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
    const { user, needsPasswordReset } = useAuth()
    const { mutate: resetPassword, isPending, isError, error } = useResetPassword()

    const [showPassword, setShowPassword] = useState(false)
    const [formError, setFormError] = useState("")

    // Special redirection: if user is already fully authenticated (has user object), 
    // or if they don't have a token/flag at all, redirect accordingly.
    if (user) {
        return <Navigate to={ROUTES.DASHBOARD.MAIN} replace />
    }

    if (!needsPasswordReset) {
        return <Navigate to={ROUTES.PUBLIC.AUTH} replace />
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError("")

        const formData = new FormData(e.currentTarget)
        const new_password = formData.get("new_password") as string
        const new_password_confirmation = formData.get("new_password_confirmation") as string

        if (new_password.length < 8) {
            setFormError("يجب أن تكون كلمة المرور 8 أحرف على الأقل")
            return
        }

        if (new_password !== new_password_confirmation) {
            setFormError("كلمات المرور غير متطابقة")
            return
        }

        resetPassword({ new_password, new_password_confirmation }, {
            onSuccess: (res) => {
                toast.success(res.message || 'تم تغيير كلمة المرور بنجاح');
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4" dir="rtl">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-lg border border-primary/10 overflow-hidden p-8 space-y-6">

                {/* Header */}
                <div className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                            <Lock size={36} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">تغيير كلمة المرور</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        يجب عليك تغيير كلمة المرور عند تسجيل الدخول لأول مرة لتأمين حسابك.
                    </p>
                </div>

                {/* Form Logic */}
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">

                    {/* Error Alerts */}
                    {formError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {formError}
                        </div>
                    )}

                    {isError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {error?.message || "فشل تغيير كلمة المرور، يرجى المحاولة مرة أخرى."}
                        </div>
                    )}

                    {/* New Password field */}
                    <div className="space-y-1.5">
                        <label htmlFor="new_password" className="text-sm font-medium text-foreground">
                            كلمة المرور الجديدة
                        </label>
                        <div className="relative">
                            <input
                                id="new_password"
                                name="new_password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full border border-border rounded-xl px-4 py-3 pl-12 text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password field */}
                    <div className="space-y-1.5">
                        <label htmlFor="new_password_confirmation" className="text-sm font-medium text-foreground">
                            تأكيد كلمة المرور الجديدة
                        </label>
                        <div className="relative">
                            <input
                                id="new_password_confirmation"
                                name="new_password_confirmation"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full border border-border rounded-xl px-4 py-3 pl-12 text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-md font-bold rounded-xl mt-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-primary/20"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={20} />
                                <span>جاري الحفظ...</span>
                            </div>
                        ) : (
                            "تحديث كلمة المرور"
                        )}
                    </Button>
                </form>

            </div>
        </div>
    )
}
