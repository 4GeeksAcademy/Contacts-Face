import { Outlet, useLocation } from "react-router-dom"; 
import ScrollToTop from "../components/ScrollToTop.jsx"; 
import { Navbar } from "../components/Navbar.jsx";     
import { Footer } from "../components/Footer.jsx";    

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