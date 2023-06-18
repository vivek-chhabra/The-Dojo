import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function useSignUpAuth(firstName, lastName, email, password) {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

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
            //updating user's name
            updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });

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

    return { error, isPending, signUp };
}

export { useSignUpAuth };
