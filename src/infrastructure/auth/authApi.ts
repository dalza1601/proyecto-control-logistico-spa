import type { AuthSession } from "../../domain/auth/models/AuthSession";
import type { LoginResponseDTO } from "./DTO/LoginResponseDTO";
import { apiClient } from "../http/axiosClient.ts";
import { AUTH_ENDPOINTS } from "../../shared/constants/endpoits.ts";

function toAuthSession(dto: LoginResponseDTO): AuthSession {
  return {
    user: {
      id: dto.username,
      username: dto.username,
    },
    token: {
      accessToken: dto.accessToken,
      expiresAt: dto.expiresAt,
      tokenType: dto.tokenType,
    },
  };
}

//Exportar objeto con medoto de autentificacion
export const authApi = {
  async login(username: string, password: string): Promise<AuthSession> {
    const { data } = await apiClient.post<LoginResponseDTO>(AUTH_ENDPOINTS.LOGIN, {
      username,
      password,
    });

    return toAuthSession(data);
  },
};
