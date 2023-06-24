import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

function useSignUpAuth(firstName, lastName, email, password) {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);

    // consuming auth context
    const { dispatch } = useContext(AuthContext);

    // sign up with email and password
    const signUp = async () => {
        setError(null);
        setIsPending(true);

        try {
            let res = await createUserWithEmailAndPassword(auth, email, password);
            if (!res) {
                throw new Error("Could not complete signup");
            }
            console.log("User Signed Up Successfully");

            //updating user's name
            await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });

            const colRef = doc(db, "user", `${auth.currentUser.uid}`); // collection ref
            console.log(auth)
            // creating a user document at firestore db
            await setDoc(colRef, { name: auth.currentUser.displayName, photoURL: auth.currentUser.photoURL, online: true, email: auth.currentUser.email, number: auth.currentUser.phoneNumber });

            dispatch({ type: "LOGIN", payLoad: res.user });

            if (!isCancelled) {
                setIsPending(false);
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    // useEffect(() => {
    //     // when component gets unmounted
    //     return () => setIsCancelled(true);
    // }, []);

    useEffect(() => {
        const unSubAuth = onAuthStateChanged(auth, (user) => {
            setUpdatedUser(user);
        });
        return () => unSubAuth();
    });

    return { error, isPending, signUp };
}

export { useSignUpAuth };
