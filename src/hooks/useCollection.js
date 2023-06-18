import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

export function useCollection(keyRef) {
    const [error, setError] = useState(null);
    const [document, setDocument] = useState([]);

    // collection reff
    const collRef = collection(db, keyRef);
    const q = query(collRef, where("uid", "==", `${auth?.currentUser?.uid}`));

    useEffect(() => {
        // real time collection of the data
        const unSub = onSnapshot(
            q,
            (snapshot) => {
                setDocument(snapshot.docs.map((transac) => ({ ...transac.data(), id: transac.id })));
                // update state error
                setError(null);
            },
            (err) => {
                console.log(err.message);
                setError("Could not fetch the data");
            }
        );

        // unsubscribe on unmount
        return () => unSub();
    }, [keyRef]);

    // console.log(document)

    return { error, document };
}
