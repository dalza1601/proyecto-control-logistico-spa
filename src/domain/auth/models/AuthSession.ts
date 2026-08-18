import type { User } from "../entities/User";
import type { AuthToken } from "./AuthToken";

export interface AuthSession {
  user: User;
  token: AuthToken;
}
