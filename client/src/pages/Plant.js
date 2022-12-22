import React from "react";
import { useParams } from "react-router-dom"
import { PlantContext } from "../components/PlantContext";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

export default function Plant(props) {
    // Grab plantId from URL
    const plantId = useParams()
    
    // Context  
    const {collection} = React.useContext(PlantContext);
    
    // Changed to const. It's not being reassigned.
    const selectedPlant = collection.find(plant => plant.id === plantId.plantId)

    // console.log(plantId.plantId)
    // console.log(collection)
    // console.log(selectedPlant)

    let comments = [
        {
            comment: "comment",
            userName: "userName",
            timeStamp: Date,
            plantId: {plantId}
        },
        {
            comment: "comment",
            userName: "userName",
            timeStamp: Date,
            plantId: {plantId}
        }
    ]
    // Updated to use ternary operator
    const commentsHtml = comments ? comments.map((comment, index) => {
            return (
            <CommentCard               
                key={index}
                {...comment}
            />);
        }) : "";

    return (
        <div className="plantpage-container">
            <h1>{selectedPlant.common_name}</h1>
            <h2>{selectedPlant.scientific_name}</h2>
            {/* Changed alt attribute. Screen reader will explain "Image of" */}
            <img src={selectedPlant.image_url} alt={`a ${selectedPlant.common_name}`}/>            
            
            {commentsHtml ? commentsHtml : "No comments yet!"}
            <CommentForm />
        </div>
    );
};