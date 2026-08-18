import type { Book } from "../../../domain/books/entities/Book";
import type { BookRepository } from "../ports/BookRepository";

export const getBookById = (bookRepository: BookRepository, id: string): Promise<Book> => {
  return bookRepository.getById(id);
};
