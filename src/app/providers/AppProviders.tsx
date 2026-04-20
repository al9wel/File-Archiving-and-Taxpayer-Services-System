import React from 'react'
import { DirectionProvider } from "@/app/providers/direction.tsx"
import { ThemeProvider } from "@/app/providers/ThemeProvider.tsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DirectionProvider dir="rtl" direction="rtl">
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    {children}
                </ThemeProvider>
            </DirectionProvider>
        </QueryClientProvider>
    )
}

export default AppProviders
