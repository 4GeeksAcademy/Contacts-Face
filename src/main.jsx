// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx"; // Importando las rutas 
import { StoreProvider } from './hooks/useGlobalReducer.jsx'; // Importando la tienda para la gestión del estado global



const Main = () => {
    return (
        <React.StrictMode>
            {}
            <StoreProvider> 
                {} 
                <RouterProvider router={router}>
                    {}
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
};

// Renderiza el main
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);