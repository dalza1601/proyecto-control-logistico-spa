import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../../../application/books/useCases/getBookById";
import { bookRepositoryImpl } from "../../../infrastructure/books/BookRepositoryImpl";

export function useBook(id: string | undefined) {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(bookRepositoryImpl, id as string),
    enabled: Boolean(id),
  });
}
