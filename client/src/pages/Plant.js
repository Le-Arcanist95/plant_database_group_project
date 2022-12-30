import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getAllComments } from "../../../backend/controllers/commentController.js";
import PlantContext from "../context/PlantProvider.js";
// import CommentCard from "../components/CommentCard";
// import CommentForm from "../components/CommentForm";

export default function Plant(props) {
    const plantId = useParams();
    console.log(plantId.plantId);
    const { getPlant, selectedPlant } = useContext(PlantContext);
    console.log(selectedPlant)  

    useEffect(() => {
        getPlant(plantId.plantId);
        getAllComments(plantId.plantId)
    }, [plantId.plantId, getPlant]);
    
    // let comments = [
    //     {
    //         comment: "comment",
    //         userName: "userName",
    //         timeStamp: Date,
    //         plantId: {plantId}
    //     },
    //     {
    //         comment: "comment",
    //         userName: "userName",
    //         timeStamp: Date,
    //         plantId: {plantId}
    //     }
    // ]
    // // Updated to use ternary operator
    // const commentsHtml = comments ? comments.map((comment, index) => {
    //         return (
    //         <CommentCard               
    //             key={index}
    //             {...comment}
    //         />);
    //     }) : "";

    return (
        <div className="plantpage-container">
            <h1>{selectedPlant.common_name}</h1>
            <h2>{selectedPlant.scientific_name}</h2>
            {/* Changed alt attribute. Screen reader will explain "Image of" */}
            <img src={selectedPlant.image_url} alt={`a ${selectedPlant.common_name}`}/>            
            
            {/* {commentsHtml ? commentsHtml : "No comments yet!"} */}
            {/* <CommentForm /> */}
        </div>
    );
};