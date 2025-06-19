// src/store.js
export const initialStore = () => {
  return {
    message: null, // Puedes usar esto para mensajes de confirmación o error
    contacts: [ // Aquí estarán tus contactos. Puedes precargar algunos para empezar.
      {
        id: 1,
        fullName: "Jiraiya ",
        address: "Aldea de Konoha",
        phone: "(870) 23453426",
        email: "Jiraiyasenin@gmail.com",
        imgUrl: "https://i.pinimg.com/736x/9b/85/18/9b8518a8d7d94904c294f7692daa5965.jpg" // URL de imagen de perfil
      },
      {
        id: 2,
        fullName: "Kyoujuro Rengoku",
        address: " Ultra Secreto",
        phone: "(123) 456-7890",
        email: "Rengoku@gmail.com",
        imgUrl: "https://i.pinimg.com/736x/03/1b/24/031b24b081dac84e34a612799bf3ee36.jpg"
      },
      {
        id: 3,
        fullName: "Kamina",
        address: "Gurre Lagan",
        phone: "(555) 123-4567",
        email: "Kamina@gmail.com",
        imgUrl: "https://i.pinimg.com/736x/5f/05/c6/5f05c61ec44345b83564132806b670b6.jpg"
      }
    ],
    // Si tenías 'todos' para la página Demo, puedes mantenerlos o quitarlos
    // todos: [
    //   { id: 1, title: "Make the bed", background: null },
    //   { id: 2, title: "Do my homework", background: null }
    // ]
  };
};

export default function storeReducer(store, action = {}) {
  let newContacts;
  // let newTodos; // Descomentar si usas la demo de 'todos'

  switch (action.type) {
    case 'ADD_CONTACT':
      // Asegura que el nuevo contacto tenga un ID único (ej. timestamp)
      newContacts = [...store.contacts, {
        id: new Date().getTime(),
        ...action.payload, // Espera que el payload contenga fullName, address, phone, email, imgUrl
      }];
      return {
        ...store,
        contacts: newContacts,
      };

    case 'DELETE_CONTACT':
      // Filtra el contacto por su ID para eliminarlo
      newContacts = store.contacts.filter(contact => contact.id !== action.payload.id);
      return {
        ...store,
        contacts: newContacts,
      };

    case 'UPDATE_CONTACT':
      // Mapea sobre los contactos para actualizar el que coincide con el ID
      newContacts = store.contacts.map(contact =>
        contact.id === action.payload.id ? { ...contact, ...action.payload.updatedContact } : contact
      );
      return {
        ...store,
        contacts: newContacts,
      };

    // Si la acción 'add_task' para 'todos' es relevante para tu Demo.jsx
    // case 'add_task':
    //   const { id: todoId, color } = action.payload; // Renombrar 'id' para evitar conflicto
    //   newTodos = store.todos.map((todo) => (todo.id === todoId ? { ...todo, background: color } : todo));
    //   return {
    //     ...store,
    //     todos: newTodos
    //   };

    default:
      throw Error(`Unknown action type: ${action.type}`);
  }
}