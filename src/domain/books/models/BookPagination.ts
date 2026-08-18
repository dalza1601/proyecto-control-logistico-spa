export interface GetBooksParameretes {
  pageNumber: number;
  pageSize: number;
  search?: string;
  sort?: string;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
