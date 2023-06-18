import { useState } from "react";

function useToggle(initialVal) {
    const [state, setState] = useState(initialVal);
    const toggle = () => {
        setState(!state);
    };
    return [state, toggle];
}

export { useToggle };
