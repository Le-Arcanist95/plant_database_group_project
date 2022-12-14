import React from "react";
import { PlantContext } from "../components/PlantContext";
import PlantCard from "../components/PlantCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Homepage() {
    // const { collection } = React.useContext(PlantContext);
    // const collectionHtml = collection.map(plant => (<PlantCard
    //     key={plant.id}
    //     {...plant}
    // />));
    return (
        <div className="homepage-container">
            <Header />
            {/* {collectionHtml} */}
            <Footer />
        </div>
    );
};