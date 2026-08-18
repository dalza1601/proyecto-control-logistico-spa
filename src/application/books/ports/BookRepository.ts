import type { Book } from "../../../domain/books/entities/Book";
import type { CreateBook } from "../../../domain/books/entities/CreateBook";
import type { UpdateBook } from "../../../domain/books/entities/UpdateBook";
import type { GetBooksParameretes, PagedResult } from "../../../domain/books/models/BookPagination";

export interface BookRepository {
  getAll(parameters: GetBooksParameretes): Promise<PagedResult<Book>>;
  getById(id: string): Promise<Book>;
  create(book: CreateBook): Promise<Book>;
  update(book: UpdateBook): Promise<Book>;
  delete(id: string): Promise<void>;
}
