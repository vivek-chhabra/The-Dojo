import { addDoc, collection, deleteDoc, doc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { auth, db } from "../firebase/config";

// initial state
const initialState = {
    document: null,
    isPending: false,
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

export function useFirestore(refKey) {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const refColl = collection(db, refKey);

    // add document
    const addDocument = async (object) => {
        dispatch({ type: "IS_PENDING" });

        // add document
        try {
            let vivek = new Date();
            let res = await addDoc(refColl, { ...object, createdAt: Timestamp.fromDate(new Date()), createdAtDate: vivek.toLocaleDateString(), uid: auth?.currentUser?.uid });

            dispatch({ type: "ADDED_DOCUMENT", payLoad: res });
        } catch (err) {
            console.log(err.message);

            dispatch({ type: "ERROR", payLoad: err.message });
        }
    };

    // delete document
    const deleteDocument = async (id) => {
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
    const editDocument = async (id, object) => {
        dispatch({ type: "IS_PENDING" });

        // editing document
        try {
            let res = await updateDoc(doc(db, refKey, id), object);

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
