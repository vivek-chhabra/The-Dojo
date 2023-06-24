import React, { useEffect, useState } from "react";
import { useToggle } from "../hooks/useToggle";
import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound({ setShowNav }) {
    const [hover, toggleHover] = useToggle(false);

    useEffect(() => {
        setShowNav(false);

        // when component unmounts
        return () => setShowNav(true);
    }, []);

    return (
        <div className="PageNotFound">
            <div className="error404">404</div>
            <div className="content">
                <h2>Oops, can't find the page what you are looking for.</h2>
                <div className="message">The page you are looking for might have been removed, had its name changed or temporarily unavailable</div>
            </div>
            <NavLink to={"/dashboard"} className="button" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                <i className={hover ? "fa-solid fa-arrow-left hover" : "fa-solid fa-arrow-left"}></i>
                <p>Back To Home Page</p>
            </NavLink>
        </div>
    );
}
