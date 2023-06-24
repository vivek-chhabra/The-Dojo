import dashboardIcon from "../assets/dashboard_icon.svg";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useState } from "react";
import addIcon from "../assets/add_icon.svg";
import { NavLink } from "react-router-dom";
import AddThumbnail from "./AddThumbnail";
import ProfileImg from "./ProfileImg";
import "./Sidebar.css";

export default function Sidebar({ handleFileInput, isPending }) {
    // auth context
    const { user } = useContext(AuthContext);

    const [updateImg, setUpdateImg] = useState(false);

    // thumbnail URL
    const url = user.photoURL;

    return (
        <div className="Sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <div className="img" onMouseEnter={() => setUpdateImg(true)} onMouseLeave={() => setUpdateImg(false)}>
                        {isPending ? <ProfileImg key={crypto.randomUUID()} url={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} /> : url && !updateImg ? <ProfileImg url={url} /> : <AddThumbnail handleFileInput={handleFileInput} />}
                    </div>
                    <p>Hey {user.displayName.split(" ")[0]}</p>
                </div>
                <div className="main-contect">
                    <NavLink className="board-links" to={"/dashboard"}>
                        <img src={dashboardIcon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className="board-links" to={"/create"}>
                        <img src={addIcon} alt="" />
                        <p>New Project</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
