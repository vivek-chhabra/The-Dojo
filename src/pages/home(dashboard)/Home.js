import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useFirestore } from "../../hooks/useFirestore";
import OnlineUsers from "../../components/OnlineUsers";
import Dashboard from "../../components/Dashboard";
import Sidebar from "../../components/Sidebar";
import React, { useState } from "react";
import "./Home.css";

export default function Home() {
    const [inputImgErr, setInputImgErr] = useState(null);
    const [uploadStarted, setUploadStarted] = useState(false);
    const [addCollStart, setAddCollStart] = useState(false);

    // use update profile hook
    const { error, isPending, UpdateProfile } = useUpdateProfile();

    // use firestore hook
    const { response } = useFirestore();

    // handling file input
    const handleFileInput = (e) => {
        let selected = e.target.files[0];
        setUploadStarted(false);
        setInputImgErr(null);

        if (!selected) return;
        else if (!selected.type.includes("image")) {
            setInputImgErr("Selected file must be an image");
            console.log(inputImgErr);
            return;
        } else if (selected.size > 800000) {
            setInputImgErr("File size must be lower than 800KB");
            console.log(inputImgErr);
            return;
        }

        setUploadStarted(true);
        UpdateProfile(selected);
    };

    // closing message after 2 seconds automatically
    if ((uploadStarted && !isPending) || (addCollStart && !response.isPending)) {
        setTimeout(() => {
            setUploadStarted(false);
            setAddCollStart(false);
        }, 5000);
    }

    return (
        <div className="Home">
            <Sidebar key={crypto.randomUUID()} isPending={isPending} handleFileInput={handleFileInput} />
            <Dashboard key={crypto.randomUUID()} isPending={isPending} addCollStart={addCollStart} setAddCollStart={setAddCollStart} uploadStarted={uploadStarted} inputImgErr={inputImgErr} error={error} />
            <OnlineUsers key={crypto.randomUUID()} />
        </div>
    );
}
