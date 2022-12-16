import React, { useState, useEffect } from "react";
import axios from "axios";
const PlantContext = React.createContext();


function PlantContextProvider(props) {

    const [authToken, setAuthToken] = useState('');
    const [searchParams, setSearchParams] = useState("");
    const [otherParams, setOtherParams] = useState("");
    const [collection, setCollection] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState();
    const [newComment, setNewComment] = useState({});

    function addNewComment(plantId) {
        axios.put('');
    }

    const soil_humidity_selected = false;
    const min = 1;
    const max = 3;
    console.log(searchParams);

    function getAll() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag`)
            .then(res => setCollection(res.data.data))
            .catch(error => console.log(error));
    }
    function getOne() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants${searchParams.search === "" ? '?' : `/search?q=${searchParams.search}&`}token=yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o`)
            .then(res => setCollection(res.data.data))
            .catch(error => console.log(error));
    }

    /* Currently unusable? Auth token is not accepted by trefle. */
    useEffect(() => {
        // Request authToken from server-side
        const getAuthToken = async () => {
            axios.get('/auth')
                .then(res => setAuthToken(res.data.token))
                .catch(err => console.log(err));
        };
        getAuthToken();
    }, []);

    // // Condition true if string is not empty
    // if(authToken) { getAll()};
    // useEffect(() => {
    //     // Condition true if string is not empty
    //     if(authToken) { getAll()};
    //    })

    // function getAll() { 
    //     const api = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants${`/${searchParams}`}`
    //     console.log(api)
    //     axios({
    //         method: 'get',
    //         url: api,
    //         params: {
    //             token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
    //         },
    //     })
    //     .then(res => setCollection(res.data.data))
    //     .catch(error => console.log(error))
    // }
    useEffect(() => {
        getAll();
    }, [authToken]);

    useEffect(() => {
        getOne();
    }, [searchParams]);


    return (
        <PlantContext.Provider value={{
            collection: collection,
            newComment: newComment,
            setNewComment: setNewComment,
            addNewComment: addNewComment,
            selectedPlant: selectedPlant,
            setSelectedPlant: setSelectedPlant,
            searchParams: searchParams,
            setSearchParams: setSearchParams,
            setOtherParams: setOtherParams
        }}>
            {props.children}
        </PlantContext.Provider>
    );
}


export { PlantContextProvider, PlantContext };