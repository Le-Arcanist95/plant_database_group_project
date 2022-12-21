import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./styles/collapsible.css";

const Collapsible = ({ open = false, children, title }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen) {setHeight(ref.current?.getBoundingClientRect().height)
        } else {setHeight(24)};
    }, [isOpen, ref]);

    return (
        <main className="collapsible" style={{ height: height, width: "50%" }}>
            <header className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
                <h5> {title} </h5>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </header>
            <section ref={ref} className="collapsible-content">
                {isOpen && <section className="collapsible-content">{children}</section>}
            </section>
        </main>
    );
}

export default Collapsible;