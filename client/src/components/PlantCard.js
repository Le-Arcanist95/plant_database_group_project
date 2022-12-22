// Purpose: To display the plant cards on the home page
import React from "react";
import { Link } from "react-router-dom";
import { PlantContext } from "./PlantContext";
import "./styles/plantCard.css";

// PlantCard component
export default function PlantCard(props) {
    // Context
    const {setSelectedPlant} = React.useContext(PlantContext)
    console.log(props)
    // Set selected plant
    function setSelection(event) {
        setSelectedPlant({
            ...props
        })
    }
    // Render PlantCard
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