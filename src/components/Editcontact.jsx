// src/pages/Editcontact.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // Import the custom hook for global state

export const Editcontact = () => {
  const { id } = useParams(); // Get the ID from the URL (will be undefined if adding a new contact)
  const { store, dispatch } = useGlobalReducer(); // Access the global state and dispatch function
  const navigate = useNavigate(); // Hook for programmatic navigation

  const isEditing = id !== undefined; // Boolean to determine if we are in editing mode

  // Define the empty initial state for the form data
  const emptyFormData = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    imgUrl: "" // Optional field for profile image URL
  };

  // Find the contact to edit from the global store if in editing mode
  const contactToEdit = isEditing
    ? store.contacts.find((contact) => contact.id === parseInt(id)) // Use parseInt to convert ID from string to number
    : null;

  // Local state to manage the form input values
  const [formData, setFormData] = useState(emptyFormData);

  // useEffect hook to handle form data initialization and resets
  useEffect(() => {
    if (isEditing) {
      if (contactToEdit) {
        setFormData(contactToEdit); // If editing, pre-fill form with existing contact data
      } else {
        // If the contact ID from the URL does not exist in the store (e.g., deleted), redirect to home
        console.warn(`Contact with ID ${id} not found. Redirecting to home.`);
        navigate("/");
      }
    } else {
      // If adding a new contact, reset the form to empty
      setFormData(emptyFormData);
    }
    // Dependencies array: re-run this effect if ID, editing status, contacts array, navigate function, or contactToEdit change
  }, [id, isEditing, store.contacts, navigate, contactToEdit]);

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field
    setFormData((prevData) => ({
      ...prevData, // Keep existing form data
      [name]: value, // Update the specific field
    }));
  };

  // Handle form submission (when save button is clicked)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    if (isEditing) {
      // If in editing mode, dispatch an UPDATE_CONTACT action
      dispatch({ type: "UPDATE_CONTACT", payload: { id: parseInt(id), updatedContact: formData } });
    } else {
      // If adding a new contact, dispatch an ADD_CONTACT action
      dispatch({ type: "ADD_CONTACT", payload: formData });
    }

    navigate("/"); // Redirect to the contacts list page after saving
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{isEditing ? "Edit Contact" : "Add a new contact"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required // Field is required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email" // Semantic type for email
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel" // Semantic type for phone number
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Image URL (Optional)</label>
          <input
            type="url" // Semantic type for URL
            className="form-control"
            id="imgUrl"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Optional image URL for avatar"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Save {/* Button text */}
        </button>
        {/* Link to go back to the contacts list */}
        <Link to="/" className="text-decoration-none d-block text-center">
          or get back to contacts
        </Link>
      </form>
    </div>
  );
};
