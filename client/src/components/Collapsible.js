// Import
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import "./styles/collapsible.css";

// Collapsible component
const Collapsible = ({ open = false, children, title }) => {
    // State
    const [isOpen, setIsOpen] = useState(open);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    // Deleted because it was setting it to a fixed height and causing unresponsiveness
    // Set height of collapsible content;
    // useEffect(() => {
    //     if (isOpen) {
    //         setHeight(ref.current?.getBoundingClientRect().height);
    //     } else { setHeight(24); };
    // }, [isOpen, ref]);

    useEffect(() => {
        if (isOpen) {
            setHeight("100%");
        } else { setHeight("30px"); };
    }, [isOpen]);

    // Render collapsible
    return (
        <section className="collapsible" style={{ height: height }}>
            <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
                <span> {title} </span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </div>
            <section ref={ref} className="collapsible-content">
                {isOpen && <section className="collapsible-content">{children}</section>}
            </section>
        </section>
    );
};

// Export
export default Collapsible;