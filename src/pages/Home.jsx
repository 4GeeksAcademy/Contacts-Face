import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal.jsx";
import { getContacts, createAgenda, deleteContact } from "../components/contactService.js";


export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDeleteId, setContactToDeleteId] = useState(null);

    /**
     * Función para obtener los contactos de la API y actualizar el store global.
     * Maneja los estados de carga y error.
     */
    const fetchContacts = async () => {
        dispatch({ type: "SET_LOADING", payload: true }); // Activa el estado de carga
        dispatch({ type: "SET_ERROR", payload: null });   // Limpia errores anteriores
        try {
            // Intenta obtener los contactos
            const data = await getContacts();
            dispatch({ type: "SET_CONTACTS", payload: data }); // Actualiza los contactos en el store
        } catch (error) {
            // Si hay un error (ej. 404, agenda no encontrada), intenta crear la agenda
            if (error.message && error.message.includes("404")) { // Se agregó verificación 'error.message'
                console.warn("Agenda no encontrada. Intentando crearla...");
                try {
                    await createAgenda(); // Llama a la función para crear la agenda
                    // Después de crear, intenta obtener los contactos de nuevo
                    await fetchContacts(); 
                    return; // Sale de la función para evitar procesar el error original
                } catch (createError) {
                    console.error("Error al crear la agenda para reintentar la obtención:", createError);
                    dispatch({ type: "SET_ERROR", payload: `Falló al crear o cargar la agenda: ${createError.message}` });
                    return;
                }
            }
            console.error("Error al obtener contactos:", error);
            dispatch({ type: "SET_ERROR", payload: `Falló al cargar los contactos: ${error.message}.` });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false }); // Desactiva el estado de carga
        }
    };

    // Efecto para cargar los contactos cuando el componente se monta
    useEffect(() => {
        fetchContacts();
    }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar

    /**
     * Maneja el clic en el botón de eliminar contacto para abrir el modal de confirmación.
     * @param {number} id El ID del contacto a eliminar.
     */
    const handleDeleteContactClick = (id) => {
        setContactToDeleteId(id);
        setShowDeleteModal(true);
    };

    /**
     * Cierra el modal de confirmación de eliminación sin realizar la acción.
     */
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setContactToDeleteId(null);
    };

    /**
     * Confirma la eliminación de un contacto llamando a la API y actualizando el store.
     */
    const handleConfirmDelete = async () => {
        if (contactToDeleteId !== null) {
            dispatch({ type: "SET_LOADING", payload: true });
            dispatch({ type: "SET_ERROR", payload: null });
            try {
                // Llama a la función de eliminación del servicio de API
                await deleteContact(contactToDeleteId);
                // Si la eliminación fue exitosa, despacha la acción para actualizar el store
                dispatch({ type: "DELETE_CONTACT", payload: { id: contactToDeleteId } });
                console.log(`Contacto con ID ${contactToDeleteId} eliminado exitosamente.`);
            } catch (error) {
                console.error("Error al eliminar contacto:", error);
                dispatch({ type: "SET_ERROR", payload: `Falló al eliminar el contacto: ${error.message}.` });
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
                setShowDeleteModal(false);
                setContactToDeleteId(null);
            }
        }
    };

    /**
     * Navega a la página de edición de contacto.
     * @param {number} id El ID del contacto a editar.
     */
    const handleEditContact = (id) => {
        navigate(`/editcontact/${id}`);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/addcontact">
                    <button className="btn btn-success">Add New Contact</button>
                </Link>
            </div>

            {store.loading && <p className="text-center text-info">Cargando contactos...</p>}
            {store.error && <p className="text-center text-danger">Error: {store.error}</p>}

            <ul className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onDelete={handleDeleteContactClick}
                            onEdit={handleEditContact}
                        />
                    ))
                ) : (
                    // Muestra un mensaje si no hay contactos y no estamos cargando/hay error
                    !store.loading && !store.error && (
                        <li className="list-group-item text-center py-4 text-muted">
                          No hay contactos aun! "Add New Contact" para agregar alguno.
                        </li>
                    )
                )}
            </ul>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="¿Estás seguro de que quieres borrar este contacto? Esta acción no se puede deshacer."
            />
        </div>
    );
};
