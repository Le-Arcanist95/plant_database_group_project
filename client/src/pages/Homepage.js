import React from "react";
import {PlantContext} from "../components/PlantContext";
import PlantCard from "../components/PlantCard";

export default function Homepage() {
    const {collection} = React.useContext(PlantContext)
    const collectionHtml = collection.map(plant => {
        <PlantCard 
            key={plant.id}
            {...plant}
        />
    })
    return (
        <div className="homepage-container">
            {collectionHtml}
        </div>
    );
};