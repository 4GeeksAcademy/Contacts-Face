import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx"; 
import { Demo } from "./pages/Demo.jsx"; 
import { Editcontact } from "./components/Editcontact.jsx"; 
import { Single } from "./pages/Single.jsx"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // El Layout se renderiza para todas las rutas hijas
    children: [
      {
        path: "/", // Ruta para la página principal (lista de contactos)
        element: <Home />,
      },
      {
        path: "/demo", // Ruta para la página de demostración (si la mantienes)
        element: <Demo />,
      },
      {
        path: "/editcontact/:id", // Ruta para editar un contacto existente (con ID)
        element: <Editcontact />,
      },
      {
        path: "/addcontact", // Ruta para añadir un nuevo contacto
        element: <Editcontact />, // Reutiliza el componente Editcontact
      },
      {
        path: "/single/:id", // Ruta para la vista de detalle de un solo contacto (si la usas)
        element: <Single />,
      },
      {
        path: "*", // Ruta comodín para manejar URL no encontradas (404)
        element: <h1 className="text-center mt-5">404  Pagina no conseguida intenta otra ruta por favor</h1>,
      },
    ],
  },
]);
