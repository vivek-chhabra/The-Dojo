import React, { createContext, useState } from "react";
import { useToggle } from "../hooks/useToggle";

export const ThemeContext = createContext();

export default function ThemeProvider(props) {
    const [isDarkMode, toggleDarkMode] = useToggle(false);

    return <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{props.children}</ThemeContext.Provider>;
}
