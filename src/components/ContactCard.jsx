// src/components/ContactCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Para hacer el nombre clickeable a la vista de detalle

export const ContactCard = ({ contact, onDelete, onEdit }) => {
  return (
    <li className="list-group-item shadow-sm mb-3 rounded"> {/* Añadido sombra, margen inferior y esquinas redondeadas */}
      <div className="row w-100 align-items-center"> {/* align-items-center para centrado vertical */}
        <div className="col-12 col-sm-6 col-md-3 px-0 text-center">
          <img
            src={contact.imgUrl || "https://via.placeholder.com/150"} // Fallback image si no hay imgUrl
            alt={`${contact.fullName}'s avatar`}
            className="rounded-circle mx-auto d-block img-fluid"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-start py-2"> {/* py-2 para padding vertical */}
          <div className="float-end"> {/* float-end para alinear botones a la derecha */}
            <button className="btn p-2" onClick={() => onEdit(contact.id)} aria-label={`Edit ${contact.fullName}`}> {/* Botón de editar */}
              <i className="fas fa-pencil-alt"></i> {/* Ícono de Font Awesome */}
            </button>
            <button className="btn p-2" onClick={() => onDelete(contact.id)} aria-label={`Delete ${contact.fullName}`}> {/* Botón de eliminar */}
              <i className="fas fa-trash-alt"></i> {/* Ícono de Font Awesome */}
            </button>
          </div>
          {/* Envolvemos el nombre y la información de contacto en un Link a la página Single */}
          <Link to={`/single/${contact.id}`} className="text-decoration-none text-reset d-block">
            <label className="name lead">{contact.fullName}</label>
            <br />
            <i className="fas fa-map-marker-alt text-muted me-3"></i> {/* Ícono de ubicación con margen */}
            <span className="text-muted">{contact.address}</span>
            <br />
            <i className="fa fa-phone fa-fw text-muted me-3"></i> {/* Ícono de teléfono con margen */}
            <span className="text-muted small">{contact.phone}</span>
            <br />
            <i className="fa fa-envelope fa-fw text-muted me-3"></i> {/* Ícono de email con margen */}
            <span className="text-muted small text-truncate">{contact.email}</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

// Definición de PropTypes para validación de props
ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};