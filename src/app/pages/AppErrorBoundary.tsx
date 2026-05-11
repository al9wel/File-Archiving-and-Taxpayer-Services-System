import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import ErrorState from "./ErrorState"

const AppErrorBoundary = () => {
    const error = useRouteError()
    
    let errorMessage = "حدث خطأ غير متوقع في النظام"

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            errorMessage = "الصفحة التي تبحث عنها غير موجودة"
        } else if (error.status === 401) {
            errorMessage = "غير مصرح لك بالوصول لهذه الصفحة"
        } else if (error.status === 503) {
            errorMessage = "الخدمة غير متوفرة حالياً"
        }
    } else if (error instanceof Error) {
        errorMessage = error.message
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full">
                <ErrorState 
                    message={errorMessage} 
                    onRetry={() => window.location.href = "/dashboard/main"} 
                />
            </div>
        </div>
    )
}

export default AppErrorBoundary
