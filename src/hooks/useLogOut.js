import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export function useLogOut() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [isCancelled, setIsCancelled] = useState(false);

    const logOut = async () => {
        setError(null);
        setIsPending(true);

        // sign the user out
        try {
            await signOut(auth);

            // dispatch logout action
            dispatch({ type: "LOGOUT" });

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
