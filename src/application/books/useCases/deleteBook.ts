import type { BookRepository } from "../ports/BookRepository";

export const deleteBook = (bookRepository: BookRepository, id: string): Promise<void> => {
  return bookRepository.delete(id);
};
