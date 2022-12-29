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
import Profile from "./pages/Profile.js";
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
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="plant/:plantId" element={<Plant />} />

                {/* Private Routes */}
                <Route element={<RequireAuth allowedRoles={[2000, 4000, 9000]} />}>
                    <Route path="profile/:userId" element={<Profile />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
};