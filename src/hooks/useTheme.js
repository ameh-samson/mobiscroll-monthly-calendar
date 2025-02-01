import { useState } from "react";

// Custom hook to manage theme
const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // Initialize the theme based on localStorage, or default to 'light'
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
    });

    // Update theme in localStorage and state when it changes
    const toggleLightTheme = () => {
        setTheme("light");
        localStorage.setItem("theme", "light");
    };

    const toggleDarkTheme = () => {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
    };

    return [theme, toggleLightTheme, toggleDarkTheme];
};

export default useTheme;
