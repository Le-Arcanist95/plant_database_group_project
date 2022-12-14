import React from "react";
import { PlantContextProvider } from "./components/PlantContext";
import Homepage from "./pages/Homepage";

export default function App() {
    return (
        <div>
            <PlantContextProvider>
            <Homepage />

            </PlantContextProvider>
        </div>
    );
};