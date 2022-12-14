import React from "react";
import CommentCard from "./CommentCard";

export default function PlantCard(props) {
    const commentsHtml = props.comments.map((comment) => {
        <CommentCard 
            {...props} 
            key={comment.id}
        />
    })
    return (
        <div className="plant-card-container">
            {commentsHtml}
        </div>
    );
};