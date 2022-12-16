import React from "react";
import { useParams } from "react-router-dom"
import PlantCard from "../components/PlantCard";
import { PlantContext } from "../components/PlantContext";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

let commentsHtml
export default function Plant(props) {
    const plantId = useParams()



    console.log(plantId.plantId)
    const {collection} = React.useContext(PlantContext)
    console.log(collection)
    let selectedPlant = collection.find(plant => plant.id == plantId.plantId)
    console.log(selectedPlant)
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
    if (comments) { 
    commentsHtml = comments.map((comment, index) => {
            return (
            <CommentCard
                key={index}
            />);
        });
    }

    return (
        <div className="plantpage-container">
            <h1>{selectedPlant.common_name}</h1>
            <h2>{selectedPlant.scientific_name}</h2>
            <img src={selectedPlant.image_url} alt={`image of ${selectedPlant.common_name}`}/>            
            
            {commentsHtml ? commentsHtml : ""}
            <CommentForm />
        </div>
    );
};