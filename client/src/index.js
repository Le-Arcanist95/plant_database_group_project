import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./context/AuthProvider.js";
import { PlantProvider } from "./context/PlantProvider.js";
import { InputProvider } from "./context/InputProvider.js";
import App from "./App.js";
import "./styles.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

// Disable React DevTools for production
if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
};

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <PlantProvider>
                    <InputProvider>
                        <Routes>
                            <Route path="/*" element={<App />}/>
                        </Routes>
                    </InputProvider>
                </PlantProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);