import type { Book } from "../../../domain/books/entities/Book";
import type { UpdateBook } from "../../../domain/books/entities/UpdateBook";
import type { BookRepository } from "../ports/BookRepository";

export const updateBook = (bookRepository: BookRepository, book: UpdateBook): Promise<Book> => {
  return bookRepository.update(book);
};
