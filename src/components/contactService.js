const AGENDA_SLUG = "Thaner1106"; 

const API_BASE_URL = `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`;

const _fetchApi = async (endpoint, options = {}) => {
    try {
        console.log(`Enviando solicitud a: ${API_BASE_URL}${endpoint} con opciones:`, options); // Log del request
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers, 
            },
            ...options, 
        });

        if (!response.ok) {
            let errorDetails = {};
            try {
                // Intenta parsear el cuerpo del error si es JSON
                errorDetails = await response.json();
            } catch (jsonError) {
                // Si no se puede parsear como JSON, lee como texto
                errorDetails = { message: await response.text() || "Error desconocido, respuesta no JSON." };
            }
            console.error("Cuerpo de error de la API (detallado):", errorDetails); // Esto es clave para depurar errores 422
            throw new Error(errorDetails.message || `HTTP error! status: ${response.status}. Detalles: ${JSON.stringify(errorDetails)}`);
        }

        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return null; 
        }

        return response.json(); 
    } catch (error) {
        console.error(`Error en la llamada a la API a ${endpoint}:`, error);
        throw error; 
    }
};

/**
 * Intenta crear una nueva agenda de contactos si no existe.
 * La API devuelve un 404 si la agenda no existe y se intenta obtener contactos.
 * @returns {Promise<object>} Una promesa que resuelve cuando la agenda se ha creado (o ya existía).
 */
export const createAgenda = async () => {
    try {
       
        const result = await _fetchApi("", { method: "POST" });
        console.log(`Agenda '${AGENDA_SLUG}' creada o ya existente:`, result);
        return result;
    } catch (error) {
        
        if (error.message.includes("agenda already exists")) {
            console.warn(`Agenda '${AGENDA_SLUG}' ya existe. Continuando.`);
            return { message: "Agenda ya existe." };
        }
        console.error(`Error al intentar crear la agenda '${AGENDA_SLUG}':`, error);
        throw error; 
    }
};

/**
 * Obtiene los detalles de la agenda.
 * @returns {Promise<object>} Una promesa que resuelve con los detalles de la agenda.
 */
export const getAgenda = async () => {
    // El endpoint para obtener los detalles de la agenda es la URL base sin ningún path adicional.
    const data = await _fetchApi("", { method: "GET" });
    return data;
};


/**
 * Obtiene todos los contactos de la agenda especificada.
 * @returns {Promise<Array>} Una promesa que resuelve con un array de objetos de contacto.
 */
export const getContacts = async () => {
    // El endpoint para obtener todos los contactos es "/contacts"
    const data = await _fetchApi("/contacts", { method: "GET" }); // Se añadió explícitamente method: "GET"
    // La API de 4Geeks a veces devuelve directamente el array, a veces un objeto con una propiedad 'contacts'
    return data.contacts || data; 
};

/**
 * Añade un nuevo contacto a la agenda.
 * @param {object} contactData Los datos del nuevo contacto (full_name, email, phone, address).
 * @returns {Promise<object>} Una promesa que resuelve con el objeto del contacto recién creado.
 */
export const addContact = async (contactData) => {
    
    // La API de 4Geeks espera 'name' para el nombre del contacto.
    const payload = { 
        name: contactData.full_name, // Mapeamos full_name del formulario a 'name' para la API
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        agenda_slug: AGENDA_SLUG 
    };
    console.log("Payload enviado para addContact:", payload); // Log del payload
    const result = await _fetchApi("/contacts", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return result;
};

/**
 * Actualiza un contacto existente en la agenda.
 * @param {number|string} contactId El ID del contacto a actualizar.
 * @param {object} updatedContactData Los nuevos datos del contacto (full_name, email, phone, address).
 * @returns {Promise<object>} Una promesa que resuelve con el objeto del contacto actualizado.
 */
export const updateContact = async (contactId, updatedContactData) => {
    // ¡CORRECCIÓN CLAVE AQUÍ! Cambiado de updatedContactData.full_name a updatedContactData.name
    // La API de 4Geeks espera 'name' para el nombre del contacto.
    const payload = { 
        name: updatedContactData.full_name, // Mapeamos full_name del formulario a 'name' para la API
        email: updatedContactData.email,
        phone: updatedContactData.phone,
        address: updatedContactData.address,
        agenda_slug: AGENDA_SLUG 
    };
    console.log("Payload enviado para updateContact:", payload); // Log del payload
    const result = await _fetchApi(`/contacts/${contactId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return result;
};

/**
 * Elimina un contacto de la agenda.
 * @param {number|string} contactId El ID del contacto a eliminar.
 * @returns {Promise<null>} Una promesa que resuelve a null si la eliminación fue exitosa.
 */
export const deleteContact = async (contactId) => {
    await _fetchApi(`/contacts/${contactId}`, {
        method: "DELETE",
    });
    return null; 
};
