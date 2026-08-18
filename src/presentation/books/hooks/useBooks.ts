import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../../application/books/useCases/getBooks";
import type { GetBooksParameretes } from "../../../domain/books/models/BookPagination";
import { bookRepositoryImpl } from "../../../infrastructure/books/BookRepositoryImpl";

export function useBooks(parameters: GetBooksParameretes) {
  return useQuery({
    queryKey: ["books", parameters],
    queryFn: () => getBooks(bookRepositoryImpl, parameters),
  });
}
