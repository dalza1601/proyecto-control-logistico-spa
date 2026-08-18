import { useForm } from "react-hook-form";
import { bookSchema, type BookFormValues } from "../schemas/bookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "../../auth/components/FieldError";

export interface BookFormProps {
    initialValues?: Partial<BookFormValues>;
    onSubmit: (values: BookFormValues) => Promise<void> | void;
    isSubmitting?: boolean;
    submitLabel?: string;
}

export function BookForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Guardar",
}: BookFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            ...initialValues,
        },
    });

    return (
        <form className="book-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor="title">Titulo</label>
            <input id="title" type="text" {...register("title")} />
            <FieldError message={errors.title?.message} />

            <label htmlFor="description">Descripcion</label>
            <input id="description" type="text" {...register("description")} />
            <FieldError message={errors.description?.message} />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : submitLabel}
            </button>
        </form>
    );
}