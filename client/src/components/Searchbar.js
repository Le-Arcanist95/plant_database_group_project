import React, { useState } from "react";
import "./styles/searchbar.css";

export default function Searchbar(props) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // const handleSubmit = () => props.handleSubmit(inputValue);
    const handleSubmit = () => console.log("queried!");

    return (
        <>
            <div className="searchbar-wrapper">
                <input type="search" value={inputValue} onChange={handleChange} />
                <button onClick={handleSubmit}>
                    <i className="bi bi-search"></i>
                    Search
                </button>
            </div>
        </>
    );
}