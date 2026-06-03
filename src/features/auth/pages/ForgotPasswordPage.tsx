import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound, ArrowRight } from "lucide-react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useForgotPasswordStore } from "../store/useForgotPasswordStore";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const { mutate: requestReset, isPending, isError, error } = useForgotPassword();
    const { setUserIdAndCode } = useForgotPasswordStore();

    const [formError, setFormError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        const formData = new FormData(e.currentTarget);
        const userName = formData.get("userName") as string;

        if (!userName.trim()) {
            setFormError("يرجى إدخال اسم المستخدم");
            return;
        }

        requestReset({ userName }, {
            onSuccess: (res) => {
                if (res.data?.user_id) {
                    setUserIdAndCode(res.data.user_id, res.data.code);
                    navigate(ROUTES.PUBLIC.VERIFY_OTP);
                } else {
                    setFormError("لم يتم العثور على معرف المستخدم في الاستجابة");
                }
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4" dir="rtl">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-lg border border-primary/10 overflow-hidden p-8 space-y-6">
                
                {/* Header */}
                <div className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                            <KeyRound size={36} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">نسيت كلمة المرور</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        أدخل اسم المستخدم الخاص بك لتلقي رمز التحقق
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {formError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {formError}
                        </div>
                    )}

                    {isError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {error?.message || "حدث خطأ، يرجى المحاولة مرة أخرى."}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label htmlFor="userName" className="text-sm font-medium text-foreground">
                            اسم المستخدم
                        </label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="أدخل اسم المستخدم"
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-md font-bold rounded-xl mt-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-primary/20"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={20} />
                                <span>جاري الإرسال...</span>
                            </div>
                        ) : (
                            "متابعة"
                        )}
                    </Button>

                    <div className="mt-4 flex justify-center">
                        <NavLink to={ROUTES.PUBLIC.AUTH} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ArrowRight size={16} />
                            <span>العودة لتسجيل الدخول</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
