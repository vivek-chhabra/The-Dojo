import { useParams } from "react-router-dom";
import "./ProjectDetails.css";
import React from "react";

export default function ProjectDetails() {
    const { id } = useParams();
    
    return <div className="ProjectDetails">ProjectDetails</div>;
}
