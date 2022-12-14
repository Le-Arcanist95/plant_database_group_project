import React from "react";
const PlantContext = React.createContext();

function PlantContextProvider(props) {
    
    return (
        <PlantContext.Provider>
            {props.children}
        </PlantContext.Provider>
    )
}


export { PlantContextProvider, PlantContext };