import type { AxiosInstance } from "axios";
import { AUTH_ENDPOINTS } from "../../shared/constants/endpoits";
import { authStorage } from "../auth/authStorage";

export function attachInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      //Nos aseguramos que tengamos alguna información en los headers antes de asignar el token
      config.headers = config.headers ?? {};
      // Agregamos el token de autorización al encabezado de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const url = error?.config?.url ?? "";
      const isLoginRequest = url.includes(AUTH_ENDPOINTS.LOGIN);

      if(status === 401 && !isLoginRequest){
        authStorage.clearSession();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    },
  );
}
