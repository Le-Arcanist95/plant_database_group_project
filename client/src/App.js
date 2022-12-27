import React from "react";
import RequireAuth from "./components/RequireAuth.js";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Homepage from "./pages/Homepage.js";
import Unauthorized from "./pages/Unauthorized.js";
import About from "./pages/About.js";
import Plant from "./pages/Plant.js";
import User from "./pages/User.js";
import Missing from "./pages/Missing.js";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* Public Routes*/}
                <Route path="/" element={<Homepage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="about" element={<About />} />
                <Route path="plant/:plantId" element={<Plant />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="user/:userId" element={<User />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
};