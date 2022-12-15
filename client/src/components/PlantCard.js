import React from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm"
export default function PlantCard(props) {
    const commentsHtml = props.comments.map((comment) => {
        <CommentCard 
            {...props} 
            key={comment.id}
        />
        
    })
    return (
        <div className="plant-card-container">
            
        </div>
    );
};