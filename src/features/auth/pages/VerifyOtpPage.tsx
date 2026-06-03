import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound, ArrowRight } from "lucide-react";
import { useVerifyForgotPasswordOtp } from "../hooks/useVerifyForgotPasswordOtp";
import { useForgotPasswordStore } from "../store/useForgotPasswordStore";

export default function VerifyOtpPage() {
    const navigate = useNavigate();
    const { mutate: verifyOtp, isPending, isError, error } = useVerifyForgotPasswordOtp();
    const { userId, code: storeCode, setIsVerified } = useForgotPasswordStore();

    const [formError, setFormError] = useState("");

    // If there's no userId in the store, they shouldn't be on this page.
    useEffect(() => {
        if (!userId) {
            navigate(ROUTES.PUBLIC.FORGOT_PASSWORD, { replace: true });
        }
    }, [userId, navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        const formData = new FormData(e.currentTarget);
        const code = formData.get("code") as string;

        if (!code.trim()) {
            setFormError("يرجى إدخال رمز التحقق");
            return;
        }

        if (!userId) return;

        verifyOtp({ userId, code }, {
            onSuccess: () => {
                setIsVerified(true);
                navigate(ROUTES.PUBLIC.RESET_PASSWORD);
            }
        });
    };

    if (!userId) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4" dir="rtl">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-lg border border-primary/10 overflow-hidden p-8 space-y-6">
                
                <div className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                            <KeyRound size={36} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">التحقق من الرمز</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        الرجاء إدخال رمز التحقق
                    </p>
                    {/* Only showing this to facilitate development since backend returns code, as requested by user to not depend heavily on UI display for future SMS. But we can show it softly or simply log it, or just use the store code if testing */}
                    {storeCode && (
                        <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg mt-2">
                            لغرض الاختبار: الرمز هو {storeCode}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {formError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {formError}
                        </div>
                    )}

                    {isError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center">
                            {error?.message || "رمز التحقق غير صحيح."}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label htmlFor="code" className="text-sm font-medium text-foreground">
                            رمز التحقق
                        </label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            placeholder="أدخل رمز التحقق"
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
                                <span>جاري التحقق...</span>
                            </div>
                        ) : (
                            "تحقق"
                        )}
                    </Button>

                    <div className="mt-4 flex justify-center">
                        <NavLink to={ROUTES.PUBLIC.FORGOT_PASSWORD} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ArrowRight size={16} />
                            <span>العودة للخلف</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
