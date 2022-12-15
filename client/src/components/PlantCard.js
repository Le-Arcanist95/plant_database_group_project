import React from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import "./styles/plantCard.css";

export default function PlantCard(props) {
    // const commentsHtml = props.comments.map((comment) => {
    //     return (<CommentCard
    //         {...props}
    //         key={comment.id}
    //     />);
    // });
    return (
        <div className="plant-card-container">
            <section>
            </section>
            {/* {commentsHtml} */}
            <img src={props.image_url} alt="plant" />
            <p>{props.common_name}</p>
            {/* {commentsHtml}
            <CommentForm
                id={props.id}
            /> */}
        </div>
    );
};