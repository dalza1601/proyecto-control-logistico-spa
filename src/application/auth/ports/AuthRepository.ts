import type { AuthSession } from "../../../domain/auth/models/AuthSession";

export interface AuthRepository {
  //Metodo que retorna el AuthSession si el login es exitoso, de lo contrario retorna null
  login(username: string, password: string): Promise<AuthSession>;
  //Metodo que retorna el AuthSession si el usuario ya tiene una sesion activa, de lo contrario retorna null
  getSession(): AuthSession | null;
}
