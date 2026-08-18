import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../presentation/auth/context/AuthContext";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{retry:1, refetchOnWindowFocus:false,},
    },
});

export function AppProviders({children}: {children: ReactNode}){
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}