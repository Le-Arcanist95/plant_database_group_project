import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./styles/about.css";

export default function About() {
    return (
        <div className="aboutpage-container">
            <Header />
            <h1>About the developers</h1>
            <Footer />
        </div>
    );
};