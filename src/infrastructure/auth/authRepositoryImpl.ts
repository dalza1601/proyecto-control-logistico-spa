import { authStorage } from "./authStorage";
import { authApi } from "./authApi";
import type { AuthRepository } from "../../application/auth/ports/AuthRepository";
import type { AuthSession } from "../../domain/auth/models/AuthSession";

export const authRepositoryImpl: AuthRepository = {
  async login(username: string, password: string): Promise<AuthSession> {
    const session = await authApi.login(username, password);
    authStorage.saveSession(session);
    return session;
  },

  getSession(): AuthSession | null {
    return authStorage.getSession();
  },
};
