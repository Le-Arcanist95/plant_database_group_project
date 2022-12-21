import React from "react";
import { Routes, Route } from "react-router";
import { PlantContextProvider } from "./components/PlantContext";
import { InputContextProvider } from "./components/InputContext";
import Homepage from "./pages/Homepage";
import About from "./pages/About.js";
import Plant from "./pages/Plant";
import User from "./pages/User"


export default function App() {
    return (
        <div>
            <React.StrictMode>
                <PlantContextProvider>
                    <InputContextProvider>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/plant/:plantId" element={<Plant />} />
                    </Routes>
                    </InputContextProvider>
                </PlantContextProvider>
            </React.StrictMode>
        </div >
    );
};