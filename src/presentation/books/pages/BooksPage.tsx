import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import type { Book } from "../../../domain/books/entities/Book";
import { useBooks } from "../hooks/useBooks";
import { useDeleteBook } from "../hooks/useDeleteBook";
import { ROUTES } from "../../../shared/constants/routes";
import { BookSearch } from "../components/BooksSearch";
import { Spinner } from "../../../shared/components/Spinner";
import { EmptyState } from "../components/EmptyState";
import { BooksTable } from "../components/BooksTable";
import { Pagination } from "../components/Pagination";
import { BookDeleteDialog } from "../components/BookDeleteDialog";

const PAGE_SIZE = 10;

export function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const pageNumber = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const [feedback, setFeedback] = useState<string | null>(
    (location.state as { message?: string } | null)?.message ?? null,
  );

    const { data, isLoading, isError, error } = useBooks({
    pageNumber,
    pageSize: PAGE_SIZE,
    search: search || undefined,
    sort: "title:asc"
  });

  const deleteMutation = useDeleteBook();

  const updateParams = (next: { page?: number; search?: string }) => {
    const params = new URLSearchParams(searchParams);
    if (next.page !== undefined) params.set("page", String(next.page));
    if (next.search !== undefined) {
      params.set("search", next.search);
      params.set("page", "1");
    }
    setSearchParams(params);
  };

  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    deleteMutation.mutate(bookToDelete.id, {
      onSuccess: () => {
        setBookToDelete(null);
        setFeedback("Libro eliminado correctamente.");
      },
    });
  };

  return (
    <div className="books-page">
      <div className="books-page-header">
        <h1>Libros</h1>
        <Link to={ROUTES.BOOKSNEW} className="new-book-button">
          + Nuevo Libro
        </Link>
      </div>

      {feedback && (
        <div className="feedback-banner" onClick={() => setFeedback(null)}>
          {feedback}
        </div>
      )}

      <BookSearch initialValue={search} onSearch={(value) => updateParams({ search: value })} />

      {isLoading && <Spinner />}

      {isError && <p className="api-error">{error.message}</p>}

      {!isLoading && !isError && data && data.items.length === 0 && (
        <EmptyState search={search || undefined} />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <BooksTable books={data.items} onDeleteRequest={setBookToDelete} />
          <Pagination
            pageNumber={data.pageNumber}
            totalPages={data.totalPages}
            hasPreviousPage={data.hasPreviousPage}
            hasNextPage={data.hasNextPage}
            onPageChange={(page) => updateParams({ page })}
          />
        </>
      )}

      {bookToDelete && (
        <BookDeleteDialog
          book={bookToDelete}
          isDeleting={deleteMutation.isPending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </div>
  );
}