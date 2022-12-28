// Import dependencies
import React from "react"
import PlantContext from "../context/PlantProvider.js"
import InputContext from "../context/InputProvider.js"

// CommentForm component
export default function CommentForm() {
    // useContext connects the sheet to be able to read and change comments
    const { setNewComment, addNewComment } = React.useContext(PlantContext)
    const { setUserInput, userInput } = React.useContext(InputContext)
    // these values will need to be captured dynamically and could be saved like this. 
    // const userObject =  
    // {userName: username
    // timeStamp: currenttime
    // plantId: plantId 
    // userId:
    // commentId:} 
    // 

    
    // function to set the new comment to the user input 
    function handleChange(event) {
        setUserInput(event.target.value)
    }

    // Handle submit
    function handleSubmit(event) {
        setNewComment(userInput)
        addNewComment(
            // We'll want to pass the parameters here to connect the comment to the database (plantId? commentId? userId?)
        )

    }

    // Render CommentForm
    return (
        <>
            <form>
                <label htmlFor="newComment">Comment: </label>
                    <input type="text" name="comment" onChange={handleChange} value={userInput.comment}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
};