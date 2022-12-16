import React from "react";
import PlantCard from "../components/PlantCard";
import { PlantContext } from "../components/PlantContext";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

let commentsHtml
export default function Plant(props) {
    const {selectedPlant} = React.useContext(PlantContext)
    console.log(selectedPlant)
    if (selectedPlant) { 
        commentsHtml = selectedPlant.comments.map((comment, index) => {
            return (
            <CommentCard
                {...comment}
                key={index}
            />);
        });
    }
    return (
        <div className="plantpage-container">            
            {commentsHtml ? {commentsHtml} : ""}
            <CommentForm
                // key={selectedPlant.id}
                // id={selectedPlant.id}
            />
        </div>
    );
};