import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "El usuario es obligatorio")
    .min(3, "El usuario debe tener al menos 3 caractereres"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(6, "La contraseña debe de ser mas de 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
