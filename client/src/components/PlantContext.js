import React, { useState, useEffect } from "react";
import axios from "axios"
const PlantContext = React.createContext();


function PlantContextProvider(props) {
    const [authToken, setAuthToken] = useState('');
    const [collection, setCollection] = useState([]);
    const [newComment, setNewComment] = useState({});

    function addNewComment(plantId) {
        axios.put(``)
    
    }
    
    // const soil_humidity_selected = false
    // const min = 1
    // const max = 3
    // const queryString = ""
    useEffect(() => {
        const getAuthToken = async () => {
            axios.get('/auth')
                .then(res => setAuthToken(res.data.token))
                .catch(err => console.log(err));
        };
        getAuthToken();
    },[]);

    useEffect(() => {
        function getAll() {
            
            // const url = `https://trefle.io/api/v1/plants?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag${queryString}`; 
            const api = 'https://trefle.io/api/v1/plants'
            axios({
                method: 'get',
                url: api,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                },
                withCredentials: false,
                params: {
                    token: authToken,
                },
            })
                .then(res => console.log(res.body))
                .catch(error => console.log(error))
        }
        getAll();
    }, [authToken]);

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