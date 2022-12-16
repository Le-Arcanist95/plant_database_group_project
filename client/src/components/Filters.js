import React, { useState, useContext } from "react";
import {PlantContext} from "./PlantContext.js"
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

    return (
        <>
            <div className="searchbar-wrapper">
                { showFilters?
                <section className="filters-wrapper" >
                    <h1 onClick={toggleFilters}>{`Filter Results >`}</h1>
                </section>
                :
                <>
                <h1 onClick={toggleFilters}>{`Hide Filters`}</h1>
                <section className="filters-wrapper" >
                    <form className="filters-Form">
                        <label htmlFor="soil_humidity_min"></label>
                        <input name="soil_humidity_min" type="Number" min="0" max="9" onChange={handleChange} value={searchParams.soil_humidity_min}>
                        </input>
                        <label htmlFor="soil_humidity_max"></label>
                        <input name="soil_humidity_max" type="Number" min="1" max="10" onChange={handleChange} value={searchParams.soil_humidity_max}></input>
                        <button className="bi bi-search" onClick={handleSubmit}></button>
                    </form>
                </section>
                </>
                }
            </div>
        </>
    );
}