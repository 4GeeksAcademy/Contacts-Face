export const initialStore = () => {
    return {
        message: null, // Puedes usar esto para mensajes de confirmación o error
        contacts: [],  // Ahora los contactos se cargarán de forma simulada/local
        loading: false, // Estado para indicar si estamos cargando (simulado)
        error: null,    // Estado para almacenar cualquier error (simulado)
        
    };
};

/**
 * Un reducer es una función pura que toma el estado actual y una acción,
 * y devuelve un nuevo estado.
 * @param {object} store El estado actual.
 * @param {object} action La acción a procesar.
 * @returns {object} El nuevo estado.
 */
export default function storeReducer(store, action = {}) {
    let newContacts;

    switch (action.type) {
        case 'SET_LOADING':
            
            return { ...store, loading: action.payload };

        case 'SET_ERROR':

            return { ...store, error: action.payload, loading: false };

        case 'SET_CONTACTS':
          
            return { ...store, contacts: action.payload, loading: false, error: null };

        case 'ADD_CONTACT':
        
            return { ...store, contacts: [...store.contacts, action.payload] };

        case 'DELETE_CONTACT':

            newContacts = store.contacts.filter(contact => contact.id !== action.payload.id);
            return { ...store, contacts: newContacts };

        case 'UPDATE_CONTACT':
          
            newContacts = store.contacts.map(contact =>
                contact.id === action.payload.id ? { ...contact, ...action.payload.updatedContact } : contact
            );
            return { ...store, contacts: newContacts };

 

        default:
            // Si llega una acción no reconocida, advertimos y devolvemos el estado sin cambios.
            console.warn(`Unknown action type: ${action.type}. This action was not handled by the reducer.`);
            return store;
    }
}

