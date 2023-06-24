import { addDoc, collection, deleteDoc, doc, updateDoc, Timestamp, serverTimestamp, getDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { auth, db } from "../firebase/config";

// initial state
const initialState = {
    document: null,
    isPending: null,
    error: null,
    success: false,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { isPending: true, document: null, error: null, success: false };
        case "ADDED_DOCUMENT":
            return { isPending: false, document: action.payLoad, error: null, success: true };
        case "ERROR":
            return { isPending: false, document: null, error: action.payLoad, success: false };
        default:
            return state;
    }
};

export function useFirestore() {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // const refColl = collection(db, refKey);

    // add document
    const addDocument = async (refKey, object) => {
        dispatch({ type: "IS_PENDING" });

        // add document
        try {
            let date = new Date();
            let res = await addDoc(collection(db, refKey), { ...object, createdAt: Timestamp.fromDate(new Date()), createdAtDate: date.toLocaleDateString(), uid: auth?.currentUser?.uid });

            dispatch({ type: "ADDED_DOCUMENT", payLoad: res });
        } catch (err) {
            console.log(err.message);

            dispatch({ type: "ERROR", payLoad: err.message });
        }
    };

    // delete document
    const deleteDocument = async (refKey, id) => {
        dispatch({ type: "IS_PENDING" });

        // deleting the document
        try {
            let res = await deleteDoc(doc(db, refKey, id));

            dispatch({ type: "ADDED_DOCUMENT", payLoad: res });
        } catch (err) {
            console.log(err.message);

            dispatch({ type: "ERROR", payLoad: err.message });
        }
    };

    // edit document
    const editDocument = async (refKey, object, id) => {
        dispatch({ type: "IS_PENDING" });

        // editing document
        try {
            let data = await getDoc(doc(db, refKey, id));

            let res = await updateDoc(doc(db, refKey, id), { ...data.data(), ...object });

            dispatch({ type: "ADDED_DOCUMENT", payLoad: res });
        } catch (err) {
            console.log(err.message);

            dispatch({ type: "ERROR", payLoad: err.message });
        }
    };

    return { addDocument, deleteDocument, editDocument, response };

    // useEffect(() => {
    //     return setIsCancelled(true)
    // }, [])
}
