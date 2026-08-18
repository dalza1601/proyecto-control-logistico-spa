import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBook } from "../../../domain/books/entities/CreateBook";
import { createBook } from "../../../application/books/useCases/createBook";
import { bookRepositoryImpl } from "../../../infrastructure/books/BookRepositoryImpl";

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: CreateBook) => createBook(bookRepositoryImpl, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
