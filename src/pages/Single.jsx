// src/pages/Single.jsx
import React from "react"; // Solo necesitamos React para el componente
import { Link, useParams } from "react-router-dom"; // Link para navegación, useParams para obtener el ID de la URL
import useGlobalReducer from "../hooks/useGlobalReducer"; // Custom hook para acceder al estado global

// Define y exporta el componente Single que muestra los detalles de un contacto individual.
export const Single = () => {
    // Accede al estado global usando el custom hook.
    const { store } = useGlobalReducer();

    // Obtiene el parámetro 'id' de la URL usando el hook useParams.
    // La ruta en routes.js es "/single/:id", por lo tanto, el parámetro se llama 'id'.
    const { id } = useParams();

    // Busca el contacto correspondiente en el array 'contacts' del store global.
    // Usamos parseInt(id) porque el ID de la URL es un string y los IDs de los contactos suelen ser números.
    const singleContact = store.contacts.find(contact => contact.id === parseInt(id));

    // Si el contacto no se encuentra (por ejemplo, si se accede directamente a una URL de ID inválida),
    // puedes mostrar un mensaje o redirigir al usuario.
    if (!singleContact) {
        return (
            <div className="container text-center mt-5">
                <h1 className="display-4">Contacto no encontrado</h1>
                <hr className="my-4" />
                <Link to="/">
                    <span className="btn btn-primary btn-lg" role="button">
                        Volver a contactos
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <div className="container text-center mt-5">
            {/* Muestra el nombre completo del contacto, recuperado dinámicamente del store */}
            <h1 className="display-4">Contacto: {singleContact.full_name}</h1>
            <hr className="my-4" /> {/* Una línea horizontal para separación visual. */}

            {/* Muestra otros detalles del contacto */}
            <p><strong>Email:</strong> {singleContact.email}</p>
            <p><strong>Teléfono:</strong> {singleContact.phone}</p>
            <p><strong>Dirección:</strong> {singleContact.address}</p>

            {/* Un componente Link que actúa como una etiqueta de anclaje pero se usa para el enrutamiento
                del lado del cliente para evitar recargas de página. */}
            <Link to="/">
                <span className="btn btn-primary btn-lg" role="button">
                    Volver a contactos
                </span>
            </Link>
        </div>
    );
};
