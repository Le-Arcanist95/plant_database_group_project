import React, { useState, useContext } from "react";
import {PlantContext} from "./PlantContext.js"
import { InputContext } from "./InputContext.js";
import {RangeSlider, Toggle} from "rsuite"
import "./styles/filters.css"


export default function Filters(props) {

    // this object holds all of the values selected by the user prior to them hitting submit. 
    const {inputValue, setInputValue} = useContext(InputContext);
    // Search params passed from context - this is where input will be saved when the user clicks submit. 
    const {setSearchParams, searchParams, filterResults} = useContext(PlantContext)

    // boolean to show/unshow filters
    const [showFilters, setShowFilters] = useState(false)



    // function to collapse/expand filters 
    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    // function to set search params when input is changed. 
    function handleSubmit(e) {
        e.preventDefault()
        setSearchParams(inputValue)
        console.log(searchParams)
        filterResults()
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
        console.log(inputValue)
    }
    return (
            <section className="filters-wrapper" >
                {/* if show filters is set to false, display the text below.  */}
                { !showFilters ? 
                
                    <h1 onClick={toggleFilters}>{`Filter Results >`}</h1>

                :
                // if show filters is set to true, display the filters below
                <>
                <h1 onClick={toggleFilters}>{`Hide Filters >`}</h1>
                    <form className="filters-Form">
                        <label id="edible">Edible Only: </label>
                        <Toggle aria-labelledby="edible" onChange={handleToggle}/>
                        <br/>
                        <label id="soil-humidity">{`Water Need (range 1-10):`}</label>
                        <RangeSlider max={10} min={1} defaultValue={[1, 10]} onChange={handleRange} />
                        {/* // constraint={([start, end]) => start <= 1 && end >= 10} */}
                        
                        {/* <label htmlFor="soil_humidity_min">Minimum Soil Humidity</label>
                        <input name="soil_humidity_min" type="Number" min="0" max="9" onChange={handleChange} value={searchParams.soil_humidity_min}>
                        </input>
                        <label htmlFor="soil_humidity_max">Maximum Soil Humidity</label>
                        <input name="soil_humidity_max" type="Number" min="1" max="10" onChange={handleChange} value={searchParams.soil_humidity_max}></input> */}
                        <button onClick={handleSubmit}>Update Results</button>    
                    </form>
                </>
                }
                </section>
    );
}