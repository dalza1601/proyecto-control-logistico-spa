import type { Book } from "../../../domain/books/entities/Book";
import type { CreateBook } from "../../../domain/books/entities/CreateBook";
import type { BookRepository } from "../ports/BookRepository";

export const createBook = (bookRepository: BookRepository, book: CreateBook): Promise<Book> => {
  return bookRepository.create(book);
};
