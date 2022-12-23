import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./styles/about.css";

export default function User() {
    return (
        <div className="aboutpage-container">
            <Header isActive={{ about: true }} />
            <h1>About the developers</h1>
            <Footer />
        </div>
    );
};