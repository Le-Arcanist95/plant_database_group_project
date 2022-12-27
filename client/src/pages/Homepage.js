import React, { useContext } from "react";
import PlantContext from "../context/PlantProvider.js";
import "./styles/homepage.css";
import PlantCard from "../components/PlantCard";
import Filters from "../components/Filters"
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Searchbar from "../components/Searchbar.js";

// Homepage component
export default function Homepage() {
    // Context
    const { collection, /* setParams - Why is this here?*/ } = useContext(PlantContext);
    console.log(collection);

    // Ternary operator that checks if the collection is greater than 0. If it is, it will map through the collection and return a PlantCard component for each plant in the collection. If the collection is empty, it will return a Loader component.
    const collectionHtml = (collection.length > 0) ?
        collection.map(plant => {
            return (
                <PlantCard
                    key={plant.id}
                    id={plant.id}
                    {...plant}
                />
            );
        }) 
    : 
        <Loader />;
        
    // Render Homepage
    return (
        <div className="homepage-container">
            {/* <Header isActive={{ home: true }} /> */}
            <Searchbar />
            <Filters />
            <section className="collection-wrapper">
                {collectionHtml}
            </section>

            {/* <Footer /> */}
        </div>
    );
};