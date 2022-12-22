// Purpose: To create a collapsible filter menu for the user to select from
// Import dependencies
import React, { useState, useContext } from "react";
import Collapsible from "./Collapsible.js";
import {PlantContext} from "./PlantContext.js";
import "./styles/searchbar.css";

// Filters component
export default function Filters(props) {
    // State
    const [inputValue, setInputValue] = useState({ 
        search : "",
        
    });
    const [showFilters, setShowFilters] = useState(false)
    const {setSearchParams, searchParams} = useContext(PlantContext)

    // Handle change
    const handleChange = (e) => {
        const {name, value} = e.target
            setInputValue({
                [name]: value
            })
            
        } 
    // Toggle filters
    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    // const handleSubmit = () => props.handleSubmit(inputValue);
    // Handle submit
    const handleSubmit = () => {
        console.log("queried!")
        setSearchParams(inputValue)
    };

    // Test onClick - remove later
    const testOnClick = (e) => {
        e.preventDefault();
        console.log("clicked!")
        
    }

    // Render Filters
    return (
        <>
            <Collapsible open title="Filters" className="searchbar-wrapper">
                <main>
                    <h1 onClick={toggleFilters}>{'Collapse'}</h1>
                    <section className="filters-wrapper" >
                        <form className="filters-Form">
                            <input type='checkbox' name='search' value={inputValue.search} onChange={handleChange} />
                        </form>
                    </section>
                </main>
            </Collapsible>
        </>
    );
}