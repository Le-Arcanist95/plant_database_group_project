import React, { useState, useContext } from "react";
import { PlantContext } from "./PlantContext.js";
import "./styles/searchbar.css";

export default function Searchbar(props) {
    const [inputValue, setInputValue] = useState({
        search: "",

    });
    const { setSearchParams, setOtherParams } = useContext(PlantContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            [name]: value
        });

    };


    // const handleSubmit = () => props.handleSubmit(inputValue);
    const handleSubmit = () => {
        // console.log("queried!");
        setSearchParams(inputValue);
    };

    return (
        <>
            <div className="searchbar-wrapper">
                <input type="search" name="search" value={inputValue.search} onChange={handleChange} />
                {/* <select>
                    <option></option>
                </select> */}
                <button onClick={handleSubmit}>
                    <i className="bi bi-search"></i>
                    Search
                </button>
            </div>
        </>
    );
}