import { RouterProvider } from "react-router-dom"
import AppProviders from "@/app/providers/AppProviders"
import { router } from "@/app/router"
import { useUser } from "@/features/auth/hooks/useUser"
import { Loader2 } from "lucide-react"
import ErrorState from "./pages/ErrorState"

const AppContent = () => {
    // isLoading is true while fetching the initial session, false otherwise.
    const { isLoading, isError } = useUser()

    if (isError) {
        return <ErrorState />;
    }
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm animate-in fade-in duration-500 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium animate-pulse">جاري التحقق من المستخدم...</p>
            </div>
        )
    }

    return <RouterProvider router={router} />
}

const App = () => {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    )
}
export default App




