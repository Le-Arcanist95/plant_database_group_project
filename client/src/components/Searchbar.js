// Purpose: Searchbar component for the Plant Database app
import React, { useState, useContext } from "react";
import { PlantContext } from "./PlantContext.js";
import "./styles/searchbar.css";

// Searchbar component
export default function Searchbar(props) {
    // State
    const [inputValue, setInputValue] = useState({
        search: "",

    });

    // Context
    const {setSearchParams} = useContext(PlantContext)

    // Handle change
    const handleChange = (e) => {
        const {name, value} = e.target
            setInputValue({
                [name]: value
            })
            
        } 



    // Revision? -- const handleSubmit = () => props.handleSubmit(inputValue);
    // Handle submit
    const handleSubmit = () => {
        // console.log("queried!");
        setSearchParams(inputValue);
    };

    // Render Searchbar
    return (
        <>
            <div className="searchbar-wrapper">
                <input type="search" name="search" value={inputValue.search} onChange={handleChange} />
                <button onClick={handleSubmit}>
                    <i className="bi bi-search"></i>
                    Search
                </button>
            </div>
        </>
    );
};