// Purpose: Searchbar component for the Plant Database app
import React, { useContext } from "react";
import PlantContext from "../context/PlantProvider.js"; 
import InputContext from "../context/InputProvider.js";
import "./styles/searchbar.css";

// Searchbar component
export default function Searchbar(props) {
    // Context
    const { setInputValue, inputValue } = useContext(InputContext)
    const {setSearchParams, filterResults} = useContext(PlantContext)

    // Handle change
    const handleChange = (e) => {
        const {name, value} = e.target
            setInputValue(prev => ({
                ...prev,
                [name]: value
            }))
            console.log(inputValue)
        } 



    // Revision? -- const handleSubmit = () => props.handleSubmit(inputValue);
    // Handle submit
    function handleSubmit(e) {
        e.preventDefault()
        // console.log("queried!");
        setSearchParams(inputValue);
        filterResults()
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