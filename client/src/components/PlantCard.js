import React from "react";
import "./styles/plantCard.css";
// import CommentCard from "./CommentCard";

export default function PlantCard(props) {
    // const commentsHtml = props.comments.map((comment) => {
    //     <CommentCard 
    //         {...props} 
    //         key={comment.id}
    //     />
    // })
    return (
        <div className="plant-card-container">
            {/* {commentsHtml} */}
            <img src={props.image_url} alt="plant" />
            <p>{props.common_name}</p>
        </div>
    );
};