//Constantes de rutas de las vistas de la aplicación
export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  BOOKS: "/books",
  BOOKSNEW: "/books/new",
  BOOKSEDITPATTERN: "/books/:id/edit",
  BOOKEDIT: (id: string) => `/books/${id}/edit`,
} as const;
