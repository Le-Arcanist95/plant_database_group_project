import React, { useState, useContext } from "react";
import { PlantContext } from "./PlantContext.js";
import { InputContext } from "./InputContext.js";
import "./styles/searchbar.css";

export default function Searchbar(props) {
    const { setInputValue, inputValue } = useContext(InputContext)
    const {setSearchParams, filterResults} = useContext(PlantContext)

    const handleChange = (e) => {
        const {name, value} = e.target
            setInputValue(prev => ({
                ...prev,
                [name]: value
            }))
            console.log(inputValue)
        } 



    // const handleSubmit = () => props.handleSubmit(inputValue);
    function handleSubmit(e) {
        e.preventDefault()
        // console.log("queried!");
        setSearchParams(inputValue);
        filterResults()
    };

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
}