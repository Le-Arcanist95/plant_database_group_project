import React, { useContext } from "react";
import { PlantContext } from "../components/PlantContext";
import "./styles/homepage.css";
import PlantCard from "../components/PlantCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function Homepage() {
    const { collection } = useContext(PlantContext);
    console.log(collection)

    const collectionHtml = collection.map(plant => {
        return ( 
            <PlantCard
                key={plant.id}
                id={plant.id}
                {...plant}
            />
            )
        });

    return (
        <div className="homepage-container">
            <Header isActive={{ home: true }} />

            <section className="collection-wrapper">
                {collection.length > 0 ? collectionHtml : <Loader />}
            </section>

            <Footer />
        </div>
    );
};