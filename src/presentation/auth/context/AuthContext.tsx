import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { AuthSession } from "../../../domain/auth/models/AuthSession";
import { authRepositoryImpl } from "../../../infrastructure/auth/authRepositoryImpl";
import { login as loginUseCase } from "../../../application/auth/useCases/login";
import { AuthContext, type AuthContextValue } from "./authContextValue";

//Provee el contexto de authenticacion, en otras palabras seria la puerta haca la capa 
//application.
export function AuthProvider({children}: {children:ReactNode}){

    const[session, setSession] = useState<AuthSession | null>(() => 
    authRepositoryImpl.getSession(),);

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = useCallback(async (username: string, password:string) =>{
        setIsLoading(true);
        try {
            const newSession = await loginUseCase(authRepositoryImpl, username,password);
            setSession(newSession);
        } finally{
            setIsLoading(false);
        }

    },[]);

    //Creando el valor del contexto
    //todo esto se envuelve en un useMemo para evitar recrear los objetos del render
    //Recuerden que es importante evitar los render innecesarios
    const value = useMemo<AuthContextValue>(
        () => ({
            //Usuario en sesion actual o se enviara null si no hay sesion
            user: session?.user ?? null,
            isAuthenticated: session !== null,
            isLoading,
            login:handleLogin,
        }),
        //Depencias: recrean el objeto cuando cambian los valores 
        [session, isLoading, handleLogin]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}