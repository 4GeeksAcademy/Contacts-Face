import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light shadow-sm"> {/* Sombra añadida para un toque visual */}
            <div className="container">
                <Link to="/">
                    {/* Título de la aplicación más relevante para una lista de contactos */}
                    <span className="navbar-brand mb-0 h1">React Contact List</span>
                </Link>
                {/* ms-auto para alinear a la derecha en Bootstrap 5 */}
                <div className="ms-auto">
                    {/* Botón para la página de demostración, con margen a la derecha */}
                    <Link to="/demo">
                        
                    </Link>
                    {/* Nuevo botón para añadir un contacto, que lleva a /addcontact */}
                    <Link to="/addcontact">
                 
                    </Link>
                </div>
            </div>
        </nav>
    );
};
