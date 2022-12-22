import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { getAnimationEnd } from "dom-lib";

const PlantContext = React.createContext();

// Create axios instance and pass through token
const trefleClient = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/',
    params: {
        token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
    }
})

// PlantContextProvider component
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

// Goes through searchParams and sets the search query and string automatically based on the input. 
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
     
    function getSome() {
       axios.get(`species${searchQuery}${searchFilters}`)
           .then(res => setCollection(res.data.data))
           .catch(error => console.log(error));
    }  
    

    console.log(searchParams)

// runs filter search results any time searchparams is updated 
    useEffect(() => {
        filterResults()
    }, [searchParams])
    
// runs getSome call to the api when the filter or query strings are updated. 
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


    // // Condition true if string is not empty
    // if(authToken) { getAll()};
    // useEffect(() => {
    //     // Condition true if string is not empty
    //     if(authToken) { getAll()};
    //    })

    // function getAll() { 
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