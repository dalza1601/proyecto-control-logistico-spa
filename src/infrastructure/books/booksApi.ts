import type { GetBooksParameretes } from "../../domain/books/models/BookPagination";
import { apiClient } from "../http/axiosClient";
import type { PagedApiResponse } from "./models/PagedApiResponse";
import { BOOKS_ENDPOINTS } from "../../shared/constants/endpoits";
import type { BookApiResponse } from "./models/BookApiResponse";
import type { BookRequestBody } from "./models/BookRequestBody";

export const booksApi = {
  async getAll(parameters: GetBooksParameretes): Promise<PagedApiResponse<BookApiResponse>> {
    const { data } = await apiClient.get<PagedApiResponse<BookApiResponse>>(BOOKS_ENDPOINTS.base, {
      params: {
        "page-number": parameters.pageNumber,
        "page-size": parameters.pageSize,
        search: parameters.search || undefined,
        sort:  parameters.sort || undefined, //title:asc
      },
    });
    return data;
  },

  async getById(id: string): Promise<BookApiResponse> {
    const { data } = await apiClient.get<BookApiResponse>(BOOKS_ENDPOINTS.byId(id));
    return data;
  },

  async create(body: BookRequestBody): Promise<BookApiResponse> {
    const { data } = await apiClient.post<BookApiResponse>(BOOKS_ENDPOINTS.base, body);
    return data;
  },

  async update(id: string, body: BookRequestBody): Promise<BookApiResponse> {
    const { data } = await apiClient.put<BookApiResponse>(BOOKS_ENDPOINTS.byId(id), body);
    return data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(BOOKS_ENDPOINTS.byId(id));
  },
};
