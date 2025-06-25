import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Este componente asegura que la página se desplace al principio al cambiar de ruta.
const ScrollToTop = ({ location, children }) => {
    const prevLocation = useRef(location); // Almacena la ubicación anterior

    useEffect(() => {
        // Comprueba si la ubicación existe y si la ruta (pathname) ha cambiado
        if (location && location.pathname !== prevLocation.current?.pathname) {
            window.scrollTo(0, 0); // Desplaza al inicio de la página (x=0, y=0)
        }
        prevLocation.current = location; // Actualiza la ubicación anterior para la próxima renderización
    }, [location]); // El efecto se re-ejecuta cuando 'location' cambia

    return children; // Renderiza los componentes hijos envueltos
};

export default ScrollToTop;

// Definición de PropTypes para validar las propiedades
ScrollToTop.propTypes = {
    location: PropTypes.object, // Se espera un objeto de ubicación de react-router-dom
    children: PropTypes.node // Cualquier elemento renderizable de React (elementos, strings, etc.)
};
