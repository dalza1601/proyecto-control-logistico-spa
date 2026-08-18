import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";

export function EmptyState({search}: {search?: string}){
    return (
        <div className="empty-state">
            {search? (<p> No se encontraron libros para "{search}"</p>) : (<>
            <p>No se encontraron libros</p>
            <Link to={ROUTES.BOOKSNEW} className="empty-state-link"> Registrar primer libro</Link>
            </>)}
        </div> 
    );
}