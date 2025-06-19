// src/pages/Layout.jsx
import { Outlet, useLocation } from "react-router-dom"; // Importa useLocation para ScrollToTop
import ScrollToTop from "../components/ScrollToTop.jsx"; // <<< RUTA CORREGIDA
import { Navbar } from "../components/Navbar.jsx";     // <<< RUTA CORREGIDA
import { Footer } from "../components/Footer.jsx";     // <<< RUTA CORREGIDA

export const Layout = () => {
    const location = useLocation();

    return (
        <ScrollToTop location={location}>
            <Navbar />
            <div className="container-fluid flex-grow-1 d-flex flex-column">
                <Outlet />
            </div>
            <Footer />
        </ScrollToTop>
    );
};