import React, { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
export const AuthContext = createContext();

// reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payLoad };
        case "LOGOUT":
            return { ...state, user: null };
        case "AUTH_IS_READY":
            return {...state, user: action.payLoad, isAuthReady: true}
        default:
            return state;
    }
};

export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false,
    });

    useEffect(() => {
        const unSubAuth = onAuthStateChanged(auth, (user) => {
            dispatch({ type: "AUTH_IS_READY", payLoad: user });
        });
        unSubAuth();
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
