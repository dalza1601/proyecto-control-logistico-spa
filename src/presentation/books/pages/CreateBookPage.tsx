import { Link, useNavigate } from "react-router-dom";
import { useCreateBook } from "../hooks/useCreateBook";
import type { BookFormValues } from "../schemas/bookSchema";
import { ROUTES } from '../../../shared/constants/routes';
import { BookForm } from "../components/BookForm";

export function CreateBookPage(){
    const navigate = useNavigate();
    const mutation = useCreateBook();

    const handleSubmit = async(values: BookFormValues) => {
        await mutation.mutateAsync(
            {title: values.title, description: values.description || undefined},
            {
                onSuccess: () => {
                    navigate(ROUTES.BOOKS, {state: {message:"Libro registrado correctamente."}});
                }
            }
        )
    };

    return (
        <div className="book-form-page">
            <Link to={ROUTES.BOOKS} className="back-link">  ← Volver al listado</Link>
            <h1> Nuevo libro</h1>
            {mutation.isError && <p className="api-error">{mutation.error.message}</p>}

            <BookForm 
            onSubmit={handleSubmit}
            isSubmitting={mutation.isPending}
            submitLabel="Crear Libro"
            />
        </div>
    );
}