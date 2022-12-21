import React, { useContext } from "react";
import { PlantContext } from "../components/PlantContext";
import "./styles/homepage.css";
import PlantCard from "../components/PlantCard";
import Filters from "../components/Filters"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function Homepage() {
    const { collection, /* setParams - Why is this here?*/ } = useContext(PlantContext);
    console.log(collection);

    let collectionHtml;
    if (collection.length > 0) {
        collectionHtml = collection.map(plant => {
            return (
                <PlantCard
                    key={plant.id}
                    id={plant.id}
                    {...plant}
                />
            );
        });
    } else if (collection);

    return (
        <div className="homepage-container">
            <Header isActive={{ home: true }} />
            <Filters />
            <section className="collection-wrapper">
                {collection.length > 0 ? collectionHtml : <Loader />}
            </section>

            <Footer />
        </div>
    );
};