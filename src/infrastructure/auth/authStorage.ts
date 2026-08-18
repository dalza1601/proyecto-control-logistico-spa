import type { AuthSession } from "../../domain/auth/models/AuthSession";

const SESSION_KEY = "library_session";

const isSessionExpired = (session: AuthSession | null): boolean => {
  if (!session?.token?.expiresAt) return false;

  const expiresAt = new Date(session.token.expiresAt).getTime();
  return Number.isFinite(expiresAt) && expiresAt <= Date.now();
};

export const authStorage = {
  saveSession(session: AuthSession): void {
    //Guardar el objeto en session en el localstorage
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  getSession(): AuthSession | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const session = JSON.parse(raw) as AuthSession;

      if (!session?.token?.accessToken) {
        this.clearSession();
        return null;
      }

      if (isSessionExpired(session)) {
        this.clearSession();
        return null;
      }

      return session;
    } catch {
      this.clearSession();
      return null;
    }
  },

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
  },

  getAccessToken(): string | null {
    const session = this.getSession();
    return session?.token.accessToken ?? null;
  },
};
