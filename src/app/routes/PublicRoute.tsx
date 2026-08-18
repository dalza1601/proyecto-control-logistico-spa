import { Navigate } from "react-router-dom";
import { useAuth } from "../../presentation/auth/context/useAuth";
import { ROUTES } from "../../shared/constants/routes";

export function PublicRoute({children}: {children: React.ReactNode}){
    const {isAuthenticated} = useAuth();
    
    if(isAuthenticated){
        return <Navigate to={ROUTES.HOME} replace />
    }

    return <>{children} </>;
}