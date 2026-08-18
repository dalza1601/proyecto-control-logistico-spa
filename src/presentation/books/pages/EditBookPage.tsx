import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateBook } from "../hooks/useUpdateBook";
import { useBook } from "../hooks/useBook";
import type { BookFormValues } from "../schemas/bookSchema";
import { ROUTES } from "../../../shared/constants/routes";
import { Spinner } from "../../../shared/components/Spinner";
import { BookForm } from "../components/BookForm";

export function EditBookPage(){
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const {data: book, isLoading, isError, error} = useBook(id);
    const mutation = useUpdateBook();

    const handleSubmit = async(values: BookFormValues) => {
        if(!id) return;
        await mutation.mutateAsync(
            {id,title: values.title, description: values.description || undefined},
            {
                onSuccess: () => {
                    navigate(ROUTES.BOOKS, {state: {message:"Libro actualizado correctamente."}});
                }
            }
        )
    };

    return (
        <div className="book-form-page">
            <Link to={ROUTES.BOOKS} className="back-link">  ← Volver al listado</Link>
            <h1> Editar libro</h1>

            {isLoading && <Spinner />}
            {isError && <p className="api-error">{error.message}</p>}
            {mutation.isError && <p className="api-error">{mutation.error.message}</p>}

            {!isLoading && !isError && book && (
                <BookForm 
            initialValues={{title: book?.title, description: book?.description ?? ""}}
            onSubmit={handleSubmit}
            isSubmitting={mutation.isPending}
            submitLabel="Guardar cambios"
            />
            )}
        </div>
    );
}