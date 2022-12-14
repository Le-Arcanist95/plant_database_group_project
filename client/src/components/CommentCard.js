import React from "react"

export default function CommentCard(props) {
    //deconstruct the props handed down from Plant Card - 
    // we may want to use context here?
    const {userName, userId, id, comment, date, time} = props

    //return all comments the selected plant
    return (
        <>
            <h1>{userName}: </h1><span>{date}, {time}</span>
            <p>{comment}</p>
            {/* if the userId is the same as the id for the comment */}
            {props.userId === id ? 
            // render this 
            <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </> 
            : "" 
            // otherwise render this
        }
        </>
    )
}