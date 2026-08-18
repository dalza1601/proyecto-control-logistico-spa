import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../../application/books/useCases/deleteBook";
import { bookRepositoryImpl } from "../../../infrastructure/books/BookRepositoryImpl";

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBook(bookRepositoryImpl, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
