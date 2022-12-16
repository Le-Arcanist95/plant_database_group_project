import React from "react"
import { PlantContext } from "./PlantContext"

export default function CommentForm() {
    const { setNewComment, addNewComment } = React.useContext(PlantContext)
    function handleChange(event) {
        setNewComment(event.target.value)
    }
    function handleSubmit(event) {
        addNewComment(event)
    }
    return (
        <>
            <form>
                <label htmlFor="newComment">Comment: </label>
                <input type="text" name="newComment" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}