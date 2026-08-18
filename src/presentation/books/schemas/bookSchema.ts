import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio").max(200, "Maximo 200 caracteres"),
  description: z.string().trim().max(1000, "Maximo 1000 caracteres").optional().or(z.literal("")),
});

export type BookFormValues = z.infer<typeof bookSchema>;
