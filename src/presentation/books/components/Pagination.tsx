interface PaginationProps{
    pageNumber: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
}

export function Pagination({
    pageNumber,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPageChange,
}: PaginationProps){
    return (
        <div className="pagination">
            <button type="button" disabled={!hasPreviousPage} onClick={() => onPageChange(pageNumber -1)}> Anterior</button>
            <span> Pagina {pageNumber} de {totalPages || 1}</span>
            <button type="button" disabled={!hasNextPage} onClick={() => onPageChange(pageNumber +1)}> Siguiente</button>
        </div>
    );
}