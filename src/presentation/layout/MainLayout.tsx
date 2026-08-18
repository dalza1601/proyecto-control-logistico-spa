import { Link } from "react-router-dom";
import { useAuth } from "../auth/context/useAuth";
import { ROUTES } from "../../shared/constants/routes";

export function MainLayout(){
    const {user} = useAuth();

    return (<div className="main-layout">
        <header className="main-header">
            <h1>Library System</h1>
            <div className="header-actions">
                <span>Bienvenido, {user?.username}</span>
            </div>
        </header>

        <nav className="main-nav">
            <Link to={ROUTES.HOME}> Dashboard</Link>
            <Link to={ROUTES.BOOKS}> Books</Link>
        </nav>

        <main className="main-content">
            <p></p>
        </main>
    </div>);
}