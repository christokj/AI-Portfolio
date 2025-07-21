import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
    dark: true,
    toggle: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [dark, setDark] = useState(true);
    const toggle = () => setDark(!dark);

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            <div className={dark ? "dark" : ""}>{children}</div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);