// src/pages/Home.jsx
import React, { useState } from "react"; // Importa useState para gestionar el estado local del modal
import { Link, useNavigate } from "react-router-dom"; // Hooks para navegación
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // Hook personalizado para el estado global
import { ContactCard } from "../components/ContactCard.jsx"; // Componente para mostrar cada tarjeta de contacto
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal.jsx"; // Importa el nuevo componente modal

export const Home = () => {
  const { store, dispatch } = useGlobalReducer(); // Accede al estado global (store) y a la función de dispatch
  const navigate = useNavigate(); // Hook para la navegación programática

  // Estado local para controlar la visibilidad del modal de confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Estado local para guardar el ID del contacto que se va a eliminar
  const [contactToDeleteId, setContactToDeleteId] = useState(null);

  // Función que se ejecuta cuando se hace clic en el botón de eliminar de una ContactCard.
  // Muestra el modal de confirmación.
  const handleDeleteContactClick = (id) => {
    setContactToDeleteId(id); // Guarda el ID del contacto que se desea eliminar
    setShowDeleteModal(true); // Establece el estado para mostrar el modal
  };

  // Función que se ejecuta cuando el usuario CANCELA la eliminación desde el modal.
  // Oculta el modal y resetea el ID del contacto.
  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Oculta el modal
    setContactToDeleteId(null); // Limpia el ID del contacto a eliminar
  };

  // Función que se ejecuta cuando el usuario CONFIRMA la eliminación desde el modal.
  // Despacha la acción DELETE_CONTACT y luego oculta el modal.
  const handleConfirmDelete = () => {
    if (contactToDeleteId !== null) { // Asegura que hay un ID de contacto guardado
      dispatch({ type: "DELETE_CONTACT", payload: { id: contactToDeleteId } }); // Despacha la acción al store
    }
    setShowDeleteModal(false); // Oculta el modal
    setContactToDeleteId(null); // Limpia el ID del contacto a eliminar
  };

  // Función para manejar la edición de un contacto. Redirige a la página de edición.
  const handleEditContact = (id) => {
    navigate(`/editcontact/${id}`); // Navega a la ruta de edición con el ID del contacto
  };

  return (
    <div className="container mt-5">
      {/* Botón para añadir un nuevo contacto, alineado a la derecha */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/addcontact">
          <button className="btn btn-success">Add new contact</button>
        </Link>
      </div>

      {/* Lista de contactos */}
      <ul className="list-group">
        {/* Renderizado condicional: si hay contactos, mapea y muestra ContactCard; si no, muestra un mensaje */}
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard
              key={contact.id} // Clave única para cada elemento de la lista (crucial para React)
              contact={contact} // Pasa el objeto de contacto a ContactCard
              onDelete={handleDeleteContactClick} // Pasa la función para iniciar la eliminación (muestra modal)
              onEdit={handleEditContact} // Pasa la función para editar
            />
          ))
        ) : (
          // Mensaje cuando la lista de contactos está vacía
          <li className="list-group-item text-center py-4 text-muted">
            No contacts yet. Click "Add new contact" to start!
          </li>
        )}
      </ul>

      {/* Renderiza el modal de confirmación. Solo se muestra si 'showDeleteModal' es true */}
      <DeleteConfirmationModal
        show={showDeleteModal} // Pasa el estado de visibilidad
        onClose={handleCancelDelete} // Función para cerrar el modal al cancelar
        onConfirm={handleConfirmDelete} // Función para confirmar la eliminación
        message="Si borras esto no lo podras recuperar" // Mensaje personalizado del modal
      />
    </div>
  );
};
