import { useCollection } from "../hooks/useCollection";
import { auth } from "../firebase/config";
import ProfileImg from "./ProfileImg";
import "./OnlineUsers.css";
import React from "react";

export default function OnlineUsers() {
    // use collection hook (to collect users info)
    const { error, document } = useCollection("user");

    // no thumbnail url
    const blankURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    return (
        <div className="OnlineUsers">
            <div className="head">
                All Users <i className="fa-solid fa-users"></i>
            </div>
            <div className="list">
                {document &&
                    document.map((doc) => {
                        return (
                            <>
                            <div className={doc.id === auth?.currentUser?.uid ? "item active-user" : "item"} key={doc.id}>
                                {doc.online && <span className="online"></span>}
                                <span className="name">
                                    {doc.name.split(" ")[0]} {!(doc.id === auth?.currentUser?.uid) ? doc.name.split(" ")[1].charAt(0) : doc.name.split(" ")[1].slice(0, 3)}
                                </span>
                                {doc.photoURL ? <ProfileImg url={doc.photoURL} color={doc.online ? "#56e1a9" : "white"} /> : <ProfileImg url={blankURL} color={doc.online ? "#56e1a9" : "white"} />}
                            </div>
                            </>
                        );
                    })}
            </div>
        </div>
    );
}
