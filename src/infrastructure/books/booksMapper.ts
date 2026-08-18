import type { Book } from "../../domain/books/entities/Book";
import type { PagedResult } from "../../domain/books/models/BookPagination";
import type { BookApiResponse } from "./models/BookApiResponse";
import type { PagedApiResponse } from "./models/PagedApiResponse";

export function mapBook(response: BookApiResponse): Book {
  return {
    id: response.id,
    title: response.title,
    description: response.description ?? undefined,
    createdAtUtc: response.createdAtUtc,
    updateAtUtc: response.updatedAtUtc,
  };
}

export function mapPagedBooks(response: PagedApiResponse<BookApiResponse>): PagedResult<Book> {
  return {
    items: response.items.map(mapBook),
    pageNumber: response.pageNumber,
    pageSize: response.pageSize,
    totalCount: response.totalCount,
    totalPages: response.totalPages,
    hasPreviousPage: response.hasPreviousPage,
    hasNextPage: response.hasNextPage,
  };
}
