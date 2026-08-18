import { Routes, Route} from "react-router-dom"
import { ROUTES } from "../../shared/constants/routes"
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../../presentation/auth/pages/LoginPage";
import { MainLayout } from "../../presentation/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { BooksPage } from "../../presentation/books/pages/BooksPage";
import { CreateBookPage } from "../../presentation/books/pages/CreateBookPage";
import { EditBookPage } from "../../presentation/books/pages/EditBookPage";
export function AppRouter(){
    return(
        <Routes>
            <Route
            path={ROUTES.LOGIN}
            element={
                <PublicRoute>
                    <LoginPage/>
                </PublicRoute>
            }
            />
            <Route
            path={ROUTES.HOME}
            element={
                <ProtectedRoute>
                    <MainLayout/>
                </ProtectedRoute>
            }
            />
            <Route
            path={ROUTES.BOOKS}
            element={
                <ProtectedRoute>
                    <BooksPage/>
                </ProtectedRoute>
            }
            />
            <Route
            path={ROUTES.BOOKSNEW}
            element={
                <ProtectedRoute>
                    <CreateBookPage/>
                </ProtectedRoute>
            }
            />
            <Route
            path={ROUTES.BOOKSEDITPATTERN}
            element={
                <ProtectedRoute>
                    <EditBookPage/>
                </ProtectedRoute>
            }
            />
        </Routes>
    );
}