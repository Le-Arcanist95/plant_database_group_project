import React from "react";
import { Routes, Route } from "react-router";
import { PlantContextProvider } from "./components/PlantContext";
import Homepage from "./pages/Homepage";
import About from "./pages/About.js";
import Plant from "./pages/Plant";

export default function App() {
    return (
        <div>
            <PlantContextProvider>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/plant/:plantId" element={<Plant />} />
                </Routes>
            </PlantContextProvider>
        </div >
    );
};