import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getAnimationEnd } from "dom-lib";
const PlantContext = React.createContext();

function PlantContextProvider(props) {

    const [authToken, setAuthToken] = useState('');
    const [searchParams, setSearchParams] = useState({})
    const [searchQuery, setSearchQuery] = useState("?")
    const [searchFilters, setSearchFilters] = useState("")
    const [collection, setCollection] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState();
    const [newComment, setNewComment] = useState({});
    const isMounted = useRef(false)
    // TO DO - this func should take the new comment from the inputContext and add it to our database
    function addNewComment() {
        // axios.put('');
    }

    function filterResults() {
        console.log(searchParams)
        // if search is undefined, set it to ? (this is for the api call)
        if (!searchParams.search || searchParams.search === "") {
            setSearchQuery("?")
        }
        // if the search is anything other than the ?  or an empty string, set the search query
        else if (searchParams.search != "?" && searchParams.search != "") {
            setSearchQuery(`/search?q=${searchParams.search}&`)
        } 
        // if the user has selected a minimum or maximum soil humidity, add the range below
        if (searchParams.minSoilHumidity) {
            setSearchFilters(`&range[soil_humidity]=${searchParams.minSoilHumidity},${searchParams.maxSoilHumidity}`)
        }
        // if the user has selected for only edible plants, add the following filter
        if (searchParams.isEdible) {
            setSearchFilters(prev => {
                return(
                `${prev}&filter[edible_part]=roots,stem,leaves,flowers,fruits,seeds`
            )})        
        }
        console.log(searchFilters)
        console.log(searchQuery)
    }
    

    // General call to the api to pull all plants
    // function getAll() {
    //    axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag`)
    //        .then(res => setCollection(res.data.data))
    //        .catch(error => console.log(error));
    // }  
    function getSome() {
       axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/species${searchQuery}token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag${searchFilters}`)
           .then(res => setCollection(res.data.data))
           .catch(error => console.log(error));
    }  
    
    // run the get request any time there is a change the search query or filters
    // useEffect(() => {
    //     console.log(collection)
    //     if (isMounted.current) {
    //         getAll();
    //     }
    // }, []);
    useEffect(() => {
        filterResults()
    }, [searchParams])
    useEffect(() => {
        if (isMounted.current) {
            getSome()
        } else {isMounted.current = true}    
    }, [searchFilters, searchQuery])

    console.log(collection)

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
            filterResults: filterResults
        }}>
            {props.children}
        </PlantContext.Provider>
    );
}


export { PlantContextProvider, PlantContext };



/* Currently unusable? Auth token is not accepted by trefle. */
// useEffect(() => {
//     // Request authToken from server-side
//     const getAuthToken = async () => {
//         axios.get('/auth')
//             .then(res => setAuthToken(res.data.token))
//             .catch(err => console.log(err));
//     };
//     getAuthToken();
// }, []);

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