import React, { useEffect } from "react";
import axios from "axios";
const PlantContext = React.createContext();


function PlantContextProvider(props) {
    const [collection, setCollection] = React.useState([]);
    const soil_humidity_selected = false;
    const min = 1;
    const max = 3;
    const queryString = "";

    function getAll() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag${queryString}`)
            .then(res => setCollection(res.data.data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <PlantContext.Provider value={{
            collection: collection
        }}>
            {props.children}
        </PlantContext.Provider>
    );
}


export { PlantContextProvider, PlantContext };