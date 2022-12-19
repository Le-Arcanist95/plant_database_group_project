import React, { useState, useContext } from "react";
import Collapsible from "./Collapsible.js";
import {PlantContext} from "./PlantContext.js";
import "./styles/searchbar.css";

export default function Filters(props) {
    const [inputValue, setInputValue] = useState({ 
        search : "",
        
    });
    const [showFilters, setShowFilters] = useState(false)
    const {setSearchParams, searchParams} = useContext(PlantContext)


    const handleChange = (e) => {
        const {name, value} = e.target
            setInputValue({
                [name]: value
            })
            
        } 
    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    // const handleSubmit = () => props.handleSubmit(inputValue);
    const handleSubmit = () => {
        console.log("queried!")
        setSearchParams(inputValue)
    };
    const testOnClick = (e) => {
        e.preventDefault();
        console.log("clicked!")
        
    }
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