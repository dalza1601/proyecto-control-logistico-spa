import type { BookRepository } from "../../application/books/ports/BookRepository";
import type { Book } from "../../domain/books/entities/Book";
import type { CreateBook } from "../../domain/books/entities/CreateBook";
import type { UpdateBook } from "../../domain/books/entities/UpdateBook";
import type { GetBooksParameretes, PagedResult } from "../../domain/books/models/BookPagination";
import { toApiError } from "../http/apiErrors";
import { booksApi } from "./booksApi";
import { mapBook, mapPagedBooks } from "./booksMapper";

export const bookRepositoryImpl: BookRepository = {
  async getAll(parameters: GetBooksParameretes): Promise<PagedResult<Book>> {
    try {
      const response = await booksApi.getAll(parameters);
      return mapPagedBooks(response);
    } catch (error) {
      throw toApiError(error);
    }
  },
  async getById(id: string): Promise<Book> {
    try {
      const response = await booksApi.getById(id);
      return mapBook(response);
    } catch (error) {
      throw toApiError(error);
    }
  },
  async create(book: CreateBook): Promise<Book> {
    try {
      const response = await booksApi.create(book);
      return mapBook(response);
    } catch (error) {
      throw toApiError(error);
    }
  },
  async update(book: UpdateBook): Promise<Book> {
    try {
      const response = await booksApi.update(book.id, {
        title: book.title,
        description: book.description,
      });
      return mapBook(response);
    } catch (error) {
      throw toApiError(error);
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await booksApi.delete(id);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
