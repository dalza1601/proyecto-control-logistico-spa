export const AUTH_ENDPOINTS = {
  LOGIN: "/v1/authentication/login",
} as const;

export const BOOKS_ENDPOINTS = {
  base: "/v1/books",
  byId: (id: string) => `/v1/books/${id}`,
} as const;
