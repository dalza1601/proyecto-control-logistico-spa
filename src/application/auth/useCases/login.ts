import type { AuthSession } from "../../../domain/auth/models/AuthSession";
import type { AuthRepository } from "../ports/AuthRepository";

//Caso de uso para el login de un usuario
//No estamos indicando si el repositorio usa Axios, Fetch o mock
export const login = async (
  authRepository: AuthRepository,
  username: string,
  password: string,
): Promise<AuthSession> => {
  return authRepository.login(username, password);
};
