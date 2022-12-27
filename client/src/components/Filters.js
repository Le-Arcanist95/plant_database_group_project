// Purpose: To create a collapsible filter menu for the user to select from
// Import dependencies
import React, { useContext } from "react";
import { PlantContext } from "../context/PlantProvider.js"
import { InputContext } from "..context/InputContext.js";
import { RangeSlider, Toggle } from "rsuite"
import "./styles/filters.css"
import Collapsible from "./Collapsible.js";


// Filters component
export default function Filters(props) {

    // State
    // this object holds all of the values selected by the user prior to them hitting submit. 
    const {inputValue, setInputValue} = useContext(InputContext);
    
    // Search params passed from context - this is where input will be saved when the user clicks submit. 
    const {setSearchParams} = useContext(PlantContext)

    // function to set search params when input is changed. 
    function handleSubmit(e) {
        e.preventDefault()
        setSearchParams(inputValue)
    }
    //function to update inputValues when the user slides the RangeSlider
    function handleRange(e) {
        setInputValue(prev => {
            return {
                ...prev,
                minSoilHumidity: e[0],
                maxSoilHumidity: e[1]
            }
        })
    }
    //function to toggle isEdible in input Value 
    function handleToggle(e){
        setInputValue(prev => {
            return {
                ...prev, 
                isEdible: e,
            }
        })
    };

    // Render Filters
    return (
        <>
            <Collapsible open title="Filters" className="searchbar-wrapper">
                    <h1> Collapse </h1>
                    <section className="filters-wrapper" >
                        <form className="filters-Form">                        
                        <label id="edible">Edible Only: </label>
                        <Toggle aria-labelledby="edible" onChange={handleToggle}/>
                        <label id="soil-humidity">{`Water Need (range 1-10):`}</label>
                        <RangeSlider max={10} min={1} defaultValue={[1, 10]} onChange={handleRange} />
                        <button onClick={handleSubmit}>Update Results</button> 
                        </form>
                    </section>
            </Collapsible>
        </>
    );
}