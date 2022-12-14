import React from "react";

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