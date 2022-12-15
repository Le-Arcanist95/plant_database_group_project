import React, { useState, useEffect } from "react";
import axios from "axios";
const PlantContext = React.createContext();


function PlantContextProvider(props) {

    const [authToken, setAuthToken] = useState('');
    const [collection, setCollection] = useState([]);
    const [newComment, setNewComment] = useState({});

    const soil_humidity_selected = false;
    const min = 1;
    const max = 3;
    const queryString = "";

    function getAll() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag${queryString}`)
            .then(res => setCollection(res.data.data))
            .catch(error => console.log(error));
    }

    function addNewComment(plantId) {
        axios.put(``);

    }

    // const soil_humidity_selected = false
    // const min = 1
    // const max = 3
    // const queryString = ""


    /* Currently unusable? Auth token is not accepted by trefle. */
    // useEffect(() => {
    //     // Request authToken from server-side
    //     const getAuthToken = async () => {
    //         axios.get('/auth')
    //             .then(res => setAuthToken(res.data.token))
    //             .catch(err => console.log(err));
    //     };
    //     getAuthToken();

    // },[]);

    // useEffect(() => {
    //     function getAll() {
    //         const api = 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants';
    //         axios({
    //             method: 'get',
    //             url: api,
    //             params: {
    //                 token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
    //             },
    //         })
    //             .then(res => console.log(res))
    //             .catch(error => console.log(error));
    //     }
    //     // Condition true if string is not empty
    //     // if(authToken) { getAll()};
    //     getAll();
    // }, [authToken]);

    useEffect(() => {
        function getAll() {
            const api = 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants';
            axios({
                method: 'get',
                url: api,
                params: {
                    token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
                },
            })
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
        // Condition true if string is not empty
        // if(authToken) { getAll()};
        getAll();
    }, [authToken]);

    return (
        <PlantContext.Provider value={{
            collection: collection,
            newComment: newComment,
            setNewComment: setNewComment,
            addNewComment: addNewComment
        }}>
            {props.children}
        </PlantContext.Provider>
    );
}


export { PlantContextProvider, PlantContext };