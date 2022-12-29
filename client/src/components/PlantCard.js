// Purpose: To display the plant cards on the home page
import React from "react";
import { Link } from "react-router-dom";
// import PlantContext from "../context/PlantProvider.js";

// PlantCard component
export default function PlantCard(props) {
    // Render PlantCard
    return (
        <div className="plant-card-container">
            <Link to={`/plant/${props.id}`}>
                <section>
                    <div className="img-container">
                        <img src={props.image_url} alt={props.common_name} />
                    </div>
                    <p>{props.common_name}</p>
                </section>
            </Link>
        </div >
    );
};