import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

export function useUpdateProfile(updatedProfile) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const [user, setUser] = useState(null);

    const UpdateProfile = async (imgThumbnail = null) => {
        setError(null);
        setIsPending(true);

        // updating user info
        try {
            let url;
            if (imgThumbnail) {
                console.log("Updating Thumbnail");
                const uploadPath = `thumbnail/${user.uid}/${imgThumbnail.name}`;
                
                const thumbnailRef = ref(storage, uploadPath);
                const imgRes = await uploadBytes(thumbnailRef, imgThumbnail);
                url = await getDownloadURL(thumbnailRef);
            }

            // uploading user info
            await updateProfile(auth.currentUser, { ...updatedProfile, photoURL: url });

            const colRef = doc(db, "user", `${auth.currentUser.uid}`); // collection ref
            // creating a user document at firestore db
            await setDoc(colRef, { name: auth.currentUser.displayName, photoURL: url, online: true });

            setIsPending(false);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    useEffect(() => {
        const unSubAuth = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        // if the component upmounts
        return () => unSubAuth();
    });

    return { error, isPending, UpdateProfile };
}
