//Muestra de aninacion de carga en UI
export function Spinner() {
    return (
        //ClassName="spinner": Clase CSS para el spinner
        //aria-label: Indica que es un elemento para lectores de pantalla (accesibilidad)
        //role: Indica que es un elemento de estado (accesibilidad)
        <span className="spinner" aria-label="Loading..." role="status">
        </span>
    );
}