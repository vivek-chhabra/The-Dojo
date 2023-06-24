import { ErrorMsg, primaryMsg, successMsg } from "../helpers";
import ProjectDetails from "../pages/project/ProjectDetails";
import ProjectList from "../pages/project/ProjectList";
import { NavLink, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import React, { useEffect, useState } from "react";
import Create from "../pages/create/Create";
import NavBar from "./NavBar";
import "./Dashboard.css";

export default function Dashboard({ inputImgErr, error, isPending, uploadStarted, setAddCollStart, addCollStart }) {
    const { response, addDocument } = useFirestore();

    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // array of all the filter links
    const filter = ["all", "mine", "development", "design", "marketing", "trading", "sales"];

    // returning the info on the bases of the href link
    const navigateTo = (href) => {
        if (href.includes("create")) {
            return <Create setAddCollStart={setAddCollStart} response={response} addDocument={addDocument} isPending={response.isPending} />;
        } else if (href.includes("project")) {
            return <ProjectDetails />;
        } else {
            return (
                <>
                    <p className="head">Dashboard</p>
                    <div className="filter">
                        {windowWidth < 1100 ? (
                            <>
                                <nav className="navbar navbar-expand-lg" style={{ width: "100%" }}>
                                    <div className="container-fluid" style={{ width: "100%" }}>
                                        <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            Filter By <i className="fa-solid fa-caret-down"></i>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: "100%" }}>
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                {filter.map((link, idx) => (
                                                    <li className="nav-item">
                                                        <NavLink to={`/dashboard/category/${link}`} className=" filter-link">
                                                            {link}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </>
                        ) : (
                            <>
                                <p>Filter By : </p>
                                <div className="links">
                                    {filter.map((link, idx) => (
                                        <NavLink className={"filter-link"} id={`link-${idx}`} to={`/dashboard/category/${link}`}>
                                            {link}
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <ProjectList filter={filter} key={crypto.randomUUID()} />
                </>
            );
        }
    };

    if (uploadStarted || addCollStart) {
        window.scrollTo(0, 0);
    }

    if (inputImgErr || error || response.error) {
        window.scrollTo(0, 0);
    }

    // changing the windowWidth
    useEffect(() => {
        const handleWidth = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWidth);
        return () => {
            window.removeEventListener("resize", handleWidth);
        };
    });

    return (
        <>
            <div className="sidebar"></div>
            <div className="Dashboard">
                <NavBar />

                {/* displaying errors related to the thumbnail upload */}
                {inputImgErr && <ErrorMsg error={inputImgErr} />}
                {error && <ErrorMsg error={error} />}
                {response.error && <ErrorMsg error={response.error} />}

                {/* uploading progress */}
                {(uploadStarted || addCollStart) &&
                    (isPending || response.isPending ? (
                        <div className="alert primary alert-primary alert-dismissible fade show" role="alert" onResize={() => console.log(window.innerWidth)}>
                            <strong>Loading,</strong> {isPending && "Thumbnail Being Uploaded . . ."} {response.isPending && "Project Being Uploaded . . ."}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ) : (
                        <div className="alert success alert-success alert-dismissible fade show" role="alert">
                            <strong>Woohoo!</strong> Uploaded Successfully.!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ))}

                {/* navigate to  */}
                {navigateTo(window.location.href)}
            </div>
            <div className="online-users"></div>
        </>
    );
}
