import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBook } from "../../../domain/books/entities/UpdateBook";
import { updateBook } from "../../../application/books/useCases/updateBook";
import { bookRepositoryImpl } from "../../../infrastructure/books/BookRepositoryImpl";

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: UpdateBook) => updateBook(bookRepositoryImpl, book),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", updated.id] });
    },
  });
}
