import AppProviders from "@/app/providers/AppProviders";
import { router } from "@/app/router";
import { RouterProvider } from "react-router-dom";
import ErrorState from "./pages/ErrorState";
import { useUser } from "@/features/auth/hooks/useUser";

const AppContent = () => {
  // isLoading is true while fetching the initial session, false otherwise.
  const { isLoading, isError } = useUser()

  if (isError) {
    return <ErrorState />;
  }
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm animate-in fade-in duration-500 space-y-4">
        {/* <Loader2 className="h-10 w-10 animate-spin text-primary" /> */}
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "var(--landing-accent)/30", borderTopColor: "var(--landing-accent)" }} />
        <p className="text-muted-foreground font-medium animate-pulse">جاري التحقق من المستخدم...</p>
      </div>
    )
  }
  return (
    <RouterProvider router={router} />
  )
}

const App = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};
export default App;
