import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "../../../shared/types/ApiError";
import type { LoginFormData } from "../schemas/loginSchema";
import { ROUTES } from "../../../shared/constants/routes";

export function useLogin() {
  //Obteniendo la funcion login del contexto de authenficacion
  const { login } = useAuth();
  //Obteniendo la funcion del navigate para redirigir las rutas
  const navigate = useNavigate();

  //Crear una mutacion (operacion asincronica) para manejar el login
  // Tipo generico: <Tipo_Retorno, tipo_error, tipo_variables>
  const mutation = useMutation<void, ApiError, LoginFormData>({
    //Funcion que se ejecuta cuando el metodo es llamado
    mutationFn: async ({ username, password }) => {
      //llamar a la funcion login para agregar las credenciales del usuario.
      await login(username, password);
    },
    //callback que se ejecuta cuando la mutacion ha sido exitosa.
    onSuccess: () => {
      //Redirige a la pagina de inicio y reemplazamos el historico.
      navigate(ROUTES.BOOKS, { replace: true });
    },
  });

  //Retornamos un objeto con las funciones y estados utiles para la UI
  return {
    //La funcion para ejecutar el envio de credenciales al servidor
    submit: mutation.mutate,
    //booleano que indica si la operacion esta aun en progreso
    isLoading: mutation.isPending,
    //Objeto error si falla la mutacion.
    error: mutation.error,
  };
}
