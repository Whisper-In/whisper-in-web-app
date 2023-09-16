"use client"

import { useAppSelector } from "@/store/hooks";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "./themes";
import { createContext } from "react";

const ThemeContext = createContext({
    setDarkMode: (isDarkMode: boolean) => { }
});

export const useAppTheme = () => useContext(ThemeContext);

export default function AppThemeProvider({ children }: PropsWithChildren) {
    const [darkMode, setDarkMode] = useState(false);
    const settingsDarkMode = useAppSelector((state) => state.app.darkMode);

    const theme = useMemo(() => {
        if (darkMode) {
            return darkTheme
        } else {
            return lightTheme
        }
    }, [darkMode]);

    useEffect(() => {
        setDarkMode(settingsDarkMode);
    }, [settingsDarkMode]);

    return (
        <ThemeContext.Provider value={{ setDarkMode: (isDarkMode) => setDarkMode(isDarkMode) }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}