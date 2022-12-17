import React from "react"

export default function CommentCard(props) {
    //deconstruct the props handed down from Plant Card - 
    // we may want to use context here?
    // Still needs userId for ID matching in edit/delete functionality
    const {userName, comment, timeStamp} = props
    
    //return all comments the selected plant
    return (
        <>
            <h1>{userName? userName : "There is no userName"} </h1><span>{timeStamp? "timeStamp" : "There is no timeStamp"} </span>
            <p>{comment? comment : ""}</p>
            {/* if the userId is the same as the id for the comment
            {props.userId === id ? 
            // render this 
            <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </> 
            : ""  */}
            {/* // otherwise render this
        } */}
        </>
    )
}