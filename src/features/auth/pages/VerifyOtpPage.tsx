import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound, ArrowRight } from "lucide-react";
import { useVerifyForgotPasswordOtp } from "../hooks/useVerifyForgotPasswordOtp";
import { useForgotPasswordStore } from "../store/useForgotPasswordStore";

export default function VerifyOtpPage() {
    const navigate = useNavigate();
    const { mutate: verifyOtp, isPending, isError, error } = useVerifyForgotPasswordOtp();
    const { userId, code: storeCode, setIsVerified, setUserIdAndCode } = useForgotPasswordStore();

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [formError, setFormError] = useState("");

    // If there's no userId in the store, they shouldn't be on this page.
    useEffect(() => {
        if (!userId) {
            navigate(ROUTES.PUBLIC.FORGOT_PASSWORD, { replace: true });
        }
    }, [userId, navigate]);

    const handleChange = (index: number, value: string) => {
        const newValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[index] = newValue;
        setOtp(newOtp);

        if (newValue && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index < 3) {
            inputRefs.current[index + 1]?.focus();
        } else if (e.key === "ArrowRight" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^a-zA-Z0-9]/g, "").slice(0, 4);
        if (!pastedData) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            if (i < 4) newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);
        
        const focusIndex = Math.min(pastedData.length, 3);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        const code = otp.join("");

        if (code.length < 4) {
            setFormError("يرجى إدخال رمز التحقق بالكامل");
            return;
        }

        if (!userId) return;

        verifyOtp({ userId, code }, {
            onSuccess: () => {
                setIsVerified(true);
                setUserIdAndCode(userId, code); // Store the code for potential future use
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
                        <div className={`p-4 rounded-full bg-primary/10 text-primary transition-all duration-500 ${isPending ? "scale-110 shadow-lg shadow-primary/30" : ""}`}>
                            <KeyRound size={36} className={isPending ? "animate-pulse" : ""} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">التحقق من الرمز</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        الرجاء إدخال رمز التحقق المكون من 4 أرقام
                    </p>
                    {storeCode && (
                        <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg mt-2">
                            لغرض الاختبار: الرمز هو {storeCode}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {formError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center animate-in fade-in zoom-in duration-300">
                            {formError}
                        </div>
                    )}

                    {isError && (
                        <div className="p-3 rounded-xl bg-red-100/50 text-red-600 border border-red-200 text-sm text-center animate-in fade-in zoom-in duration-300">
                            {error?.message || "رمز التحقق غير صحيح."}
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="flex justify-center gap-3 sm:gap-4" dir="ltr">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold border rounded-2xl bg-input text-foreground transition-all duration-300 outline-none
                                        ${digit ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-border'} 
                                        focus:border-primary focus:ring-4 focus:ring-primary/30 focus:-translate-y-1
                                        ${isPending ? 'opacity-70 animate-pulse pointer-events-none' : ''}
                                    `}
                                    disabled={isPending}
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className={`w-full h-12 text-md font-bold rounded-xl mt-4 cursor-pointer transition-all duration-300 active:scale-95 shadow-lg 
                            ${isPending ? 'shadow-primary/40 bg-primary/90' : 'shadow-primary/20'}
                        `}
                        disabled={isPending || otp.join("").length < 4}
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
