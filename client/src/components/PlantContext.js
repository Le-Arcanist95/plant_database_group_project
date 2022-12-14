import React, { useEffect } from "react";
import axios from "axios"
const PlantContext = React.createContext();


function PlantContextProvider(props) {
    const [collection, setCollection] = React.useState([])
    const [newComment, setNewComment] = React.useState({})

    function addNewComment() {

    }
 
    const soil_humidity_selected = false
    const min = 1
    const max = 3
    const queryString = ""

    function getAll() {
        axios.get(`https://trefle.io/api/v1/plants?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag${queryString}`)
        .then(res => console.log(res.body))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <PlantContext.Provider value={{
            collection:collection,
            newComment: newComment,
            setNewComment: setNewComment,
            addNewComment: addNewComment
        }}>
            {props.children}
        </PlantContext.Provider>
    )
}


export { PlantContextProvider, PlantContext };