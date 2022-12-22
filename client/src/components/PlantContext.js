import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { getAnimationEnd } from "dom-lib"; -- Why is this here?

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
    // const [authToken, setAuthToken] = useState('');
    const [searchParams, setSearchParams] = useState({})
    const [searchQuery, setSearchQuery] = useState("")
    const [searchFilters, setSearchFilters] = useState("")
    const [collection, setCollection] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState();
    const [newComment, setNewComment] = useState({});
    const isMounted = useRef(false)
    // TO DO - this func should take the new comment from the inputContext and add it to our database
    function addNewComment() {
        // axios.put('');
    }

    // IMPORTANT -- Dependency arrays for both our useEffects were not tracking our functions properly. This was the second time I've pulled down code and encountered the error. These are functions that alter state and should either be tracked or moved inside of the effect. The dependency array is meant to track "reactive" variables and our functions directly interact with state which is exactly that. If we are not tracking the functions that modify state then we are not properly tracking the changes to state.filterResults and getPlants have been moved inside of their respective useEffect. If the functions must live outside of useEffect, they should be wrapped in useCallback. It is best practice to use useCallback when passing functions to child components, as well. - Levi

    // runs filter search results any time searchparams is updated 
    useEffect(() => {
        // Purpose: Goes through searchParams and sets the search query and string automatically based on the input. 
        const filterResults = () => {
            // if search is undefined, set it to ? (this is for the api call)
            if (!searchParams.search || searchParams.search === "") {
                setSearchQuery("?")
            }
            // if the search is anything other than the ?  or an empty string, set the search query
            else if (searchParams.search !== "?" && searchParams.search !== "") {
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
        }
        filterResults();
    }, [searchParams])
    
// runs getSome call to the api when the filter or query strings are updated. 
    useEffect(() => {
        if (isMounted.current) {
            // Purpose: Makes the api call to get the plants based on the search query and filters (renamed as GetPlants for clarity)
            const getPlants = () => {
                trefleClient.get(`species${searchQuery}${searchFilters}`)
                    .then(res => setCollection(res.data.data))
                    .catch(error => console.log(error));
            }
            getPlants();
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
            setSearchParams: setSearchParams
        }}>
            {props.children}
        </PlantContext.Provider>
    );
}


export { PlantContextProvider, PlantContext };

