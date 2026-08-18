import type { Book } from "../../../domain/books/entities/Book";

interface BookDeleteDialogProps {
    book: Book;
    isDeleting: boolean;
    onConfirm:() => void;
    onCancel: () => void;
}

export function BookDeleteDialog({book, isDeleting, onConfirm, onCancel}: BookDeleteDialogProps){
    return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
        <div className="dialog-card">
            <p>Desea eliminar "{book.title}"?</p>
            <div className="dialog-actions">
                <button type="button" onClick={onCancel} disabled={isDeleting}>Cancelar</button>
                <button type="button" className="dialog-danger" onClick={onConfirm} disabled={isDeleting}>
                    { isDeleting ? "Eliminando..." : "Eliminar"}
                </button>
            </div>
        </div>
    </div>);
}