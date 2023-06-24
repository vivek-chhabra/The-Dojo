import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useDocument(refKey, id) {
    const [error, seterror] = useState(null);
    const [document, setdocument] = useState(null);

    useEffect(() => {
        const unSubSnap = onSnapshot(
            doc(db, refKey, id),
            (snap) => {
                if (snap.data()) {
                    seterror(null);
                    setdocument({ ...snap.data(), id: snap.id });
                } else {
                    seterror("No such document exists");
                    console.log(error);
                }
            },
            (err) => {
                console.log(err.message);
                seterror(err.message);
            }
        );

        // when the component gets unmounted
        return () => unSubSnap();
    }, [refKey, id]);

    return { error, document };
}
