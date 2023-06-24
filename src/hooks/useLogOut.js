import { onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export function useLogOut() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [isCancelled, setIsCancelled] = useState(false);

    // auth context
    const { user } = useContext(AuthContext);

    const logOut = async () => {
        setError(null);
        setIsPending(true);

        // sign the user out
        try {
            // changes at user collection if user logs out
            const colRef = doc(db, "user", `${user.uid}`); // collection ref
            await setDoc(colRef, { name: user.displayName, photoURL: user.photoURL, online: false });

            // logging out the user
            await signOut(auth);

            // dispatch logout action
            dispatch({ type: "LOGOUT" });

            if (!auth?.currentUser?.uid) {
                console.log("User Is Not Logged In");
            }

            if (!isCancelled) {
                setIsPending(false);
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    // useEffect(() => {
    //     // when component gets unmounted
    //     return () => setIsCancelled(true);
    // }, []);

    return { error, isPending, logOut };
}
