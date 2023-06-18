import { signOut, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function useLoginAuth(email, password) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    // consuming auth context
    const { dispatch } = useContext(AuthContext);

    // login with email and password
    const login = async () => {
        setIsPending(true);
        setError(null);

        // logging in the user
        try {
            let res = await signInWithEmailAndPassword(auth, email, password);

            // dispatch login action
            dispatch({ type: "LOGIN", payLoad: res.user });

            // won't run if the corresponding component gets unmounted
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

    // login with google
    const googleLogin = async () => {
        setIsPending(true);
        setError(null);
        console.log("initial stage");

        try {
            let res = await signInWithPopup(auth, googleProvider);
            console.log("response", res);

            // dispatch login action
            dispatch({ type: "LOGIN", payLoad: res.user });

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
    //     // return () => setIsCancelled(true);
    // }, []);

    return { error, isPending, login, googleLogin };
}
