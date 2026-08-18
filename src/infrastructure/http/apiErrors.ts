import axios from "axios";
import type { ApiError } from "../../shared/types/ApiError";

//Modelo de dominio compartido para representar errores de la API
export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    //Obtenemos el codigo de estado HTTP de la respuesta si existe
    const status = error.response?.status;
    //obtenemos los datos de la respuesta si existen y los casteamos a un objeto con propiedades opcionales message y code
    const data = error.response?.data as { message?: string; code?: string } | undefined;
    return {
      status,
      message: mapStatusToMessage(status, data?.message),
      code: data?.code,
      details: data,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Ocurrió un error desconocido. Por favor, intenta nuevamente más tarde." };
}

function mapStatusToMessage(status: number | undefined, backendMessage?: string): string {
  if (backendMessage) return backendMessage;

  switch (status) {
    case 400:
      return "Solicitud incorrecta. Por favor, verifica los datos enviados.";
    case 401:
      return "No autorizado. Por favor, inicia sesión para continuar.";
    case 403:
      return "Prohibido. No tienes permisos para acceder a este recurso.";
    case 404:
      return "Recurso no encontrado. La URL solicitada no existe.";
    case 409:
      return "Existe un conflicto con el estado actual del recurso. Por favor, verifica los datos enviados.";
    case 500:
      return "Error interno del servidor. Por favor, intenta nuevamente más tarde.";
    case 503:
      return "Servicio no disponible. Por favor, intenta nuevamente más tarde.";
    default:
      return "Ocurrió un error desconocido. Por favor, intenta nuevamente más tarde.";
  }
}
