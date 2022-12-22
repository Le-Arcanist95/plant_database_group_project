// Import dependencies
import React from "react"
import { PlantContext } from "./PlantContext"

// CommentForm component
export default function CommentForm() {
    // Context
    const { setNewComment, addNewComment } = React.useContext(PlantContext)
    
    // Handle change
    function handleChange(event) {
        setNewComment(event.target.value)
    }

    // Handle submit
    function handleSubmit(event) {
        addNewComment(event)
    }

    // Render CommentForm
    return (
        <>
            <form>
                <label htmlFor="newComment">Comment: </label>
                <input type="text" name="newComment" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
};