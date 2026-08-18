export interface AuthToken {
  //token jwt para el acceso
  accessToken: string;
  //fecha de expiracion del token
  expiresAt: string;
  //tipo de token (generalmente "Bearer")
  tokenType: string;
}
