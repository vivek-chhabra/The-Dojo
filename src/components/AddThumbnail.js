import React from "react";
import "./ProfileImg.css";

export default function AddThumbnail({ handleFileInput }) {
    return (
        <div className="AddThumbnail ProfileImg">
            <input type="file" className="add-file" onChange={handleFileInput} />
            <i className="fa-solid fa-plus"></i>
        </div>
    );
}
