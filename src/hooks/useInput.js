import { useState } from "react";

function useInput(initialVal) {
    const [state, setState] = useState(initialVal);
    const updateState = (e) => {
        setState(e.target.value);
    };
    const reset = () => {
        setState("");
    };
    return [state, updateState, reset];
}

export { useInput };
