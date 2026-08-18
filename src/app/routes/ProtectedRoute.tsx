import { Navigate } from "react-router-dom";
import { useAuth } from "../../presentation/auth/context/useAuth";
import { ROUTES } from "../../shared/constants/routes";

export function ProtectedRoute({children}: {children: React.ReactNode}){
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return <>{children}</>
    
}