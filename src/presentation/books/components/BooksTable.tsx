import { Link } from "react-router-dom";
import type { Book } from "../../../domain/books/entities/Book";
import { ROUTES } from "../../../shared/constants/routes";

interface BooksTableProps{
    books:Book[];
    onDeleteRequest: (book:Book) =>void;
}

export function BooksTable({books, onDeleteRequest}: BooksTableProps){
    return(
        <table className="books-table">
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) =>(
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.description || "-"}</td>
                        <td className="books-table-actions">
                            <Link to={ROUTES.BOOKEDIT(book.id)}>Editar</Link>
                            <button type="button" onClick={() => onDeleteRequest(book)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}