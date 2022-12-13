import React from "react";

function PlantContextProvider(props) {
    return (
        <PlantContext.Provider>
            {props.children}
        </PlantContext.Provider>
    )
}

const PlantContext = React.createContext();

export { PlantContextProvider, PlantContext };