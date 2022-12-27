import React, { useState, useEffect, useRef } from "react";
import { trefleClient } from "../api/axios";

const PlantContext = React.createContext();

// PlantContextProvider component
export const PlantContextProvider = ({children}) => {
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
            {children}
        </PlantContext.Provider>
    );
}


export default PlantContext;