import React from "react";
import { Link } from "react-router-dom";
import { PlantContext } from "./PlantContext";
import "./styles/plantCard.css";

export default function PlantCard(props) {
    const {setSelectedPlant} = React.useContext(PlantContext)
    console.log(props)
    function setSelection(event) {
        setSelectedPlant({
            ...props
        })
    }
    
    return (
        <div className="plant-card-container">
            <Link to={`/plant/${props.id}`}>
            <section onClick={setSelection}>
            <img src={props.image_url} alt="plant" />
            <p>{props.common_name}</p>
            </section> 
            </Link>
        </div>
    );
};