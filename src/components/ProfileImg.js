import React from "react";
import "./ProfileImg.css";

export default function ProfileImg({ url, color }) {
    return (
        <div className="ProfileImg" style={{ border: `2px solid ${color}` }}>
            <div className="backImg">
                <img src={url ? url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            </div>
        </div>
    );
}
