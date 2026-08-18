import { useState } from "react";
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { useLogin } from "../hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "../components/FieldError";
import { useForm } from "react-hook-form";

export function LoginPage(){
    //Creamos las variables para el efecto de mostrar/ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);
    //Hacemos las funciones de submit, para el estado de carga del objeto y error del hook personalizado.
    const { submit, isLoading, error } = useLogin();

    const {
        //Metodo para registrar los campos del formulario
        register,
        //Metodo para manejar el envio del formulario
        handleSubmit,
        //Objeto con los estados del formulario (errores, etc.)
        formState: {errors},
    } = useForm<LoginFormData>({
        //El resolver Zod para la validacion
        resolver: zodResolver(loginSchema)
    })

    //La funcion que ejecuta el comando de formulario valido
    //se recibe los datos del formulario ya validados.
    const onSubmit = (data: LoginFormData) => submit(data);

    return(
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h1>Library System</h1>
                <p className="login-subtitle">Inicia sesión para continuar</p>

                <label htmlFor="username">Usuario</label>
                <input id="username" type="text" autoComplete="username" {...register("username")} />
                <FieldError message={errors.username?.message}/>

                <label htmlFor="password">Contraseña</label>
                <div className="password-field">
                    <input id="password" type={showPassword ? "text" : "password"}
                    autoComplete="current-password" {...register("password")}
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword? "Ocultar contraseña" : "Mostrar contraseña"}>
                            {showPassword ? "Ocultar":"Mostrar"}
                        </button>
                </div>
                <FieldError message={errors.password?.message} />
                {error && <p className="api-error">{error.message}</p>}
                
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? "Ingresando..." : "Iniciar sasion"}
                </button>
            </form>
        </div>
    );
    

}