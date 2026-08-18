import type { Book } from "../../../domain/books/entities/Book";
import type { GetBooksParameretes, PagedResult } from "../../../domain/books/models/BookPagination";
import type { BookRepository } from "../ports/BookRepository";

export const getBooks = (
  bookRepository: BookRepository,
  parameters: GetBooksParameretes,
): Promise<PagedResult<Book>> => {
  return bookRepository.getAll(parameters);
};
