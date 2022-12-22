// Purpose: To display the plant cards on the home page
import React from "react";
import { Link } from "react-router-dom";
import { PlantContext } from "./PlantContext";
import "./styles/plantCard.css";

// PlantCard component
export default function PlantCard(props) {
    // Context
    const { setSelectedPlant } = React.useContext(PlantContext);
    // Set selected plant
    function setSelection(event) {
        setSelectedPlant({
            ...props
        });
    }
    // Render PlantCard
    return (
        <div className="plant-card-container">
            <Link to={`/plant/${props.id}`}>
                <section onClick={setSelection}>
                    <div className="img-container">
                        <img src={props.image_url} alt={props.common_name} />
                    </div>
                    <p>{props.common_name}</p>
                </section>
            </Link>
        </div >
    );
};