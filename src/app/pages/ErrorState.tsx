import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
    message?: string
    onRetry?: () => void
}

const ErrorState = ({ 
    message = "حدث خطأ أثناء تحميل البيانات", 
    onRetry = () => window.location.reload() 
}: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <AlertCircle size={32} />
            </div>
            <p className="text-red-600 font-bold text-lg">{message}</p>
            <Button 
                onClick={onRetry}
                variant="outline"
                className="border-red-200 hover:bg-red-50 hover:text-red-700 font-medium px-8 transition-colors"
            >
                إعادة المحاولة
            </Button>
        </div>
    )
}

export default ErrorState
