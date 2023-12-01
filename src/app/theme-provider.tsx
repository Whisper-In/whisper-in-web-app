"use client"

import createCache, { Options } from '@emotion/cache';
import { useAppSelector } from "@/store/hooks";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "./themes";
import { createContext } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from '@emotion/react';

const ThemeContext = createContext({
    setDarkMode: (isDarkMode: boolean) => { }
});

export const useAppTheme = () => useContext(ThemeContext);

export default function AppThemeProvider({ children, options }: { options: Options } & PropsWithChildren) {
    const [darkMode, setDarkMode] = useState(true);
    const settingsDarkMode = useAppSelector((state) => state.app.darkMode);

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);

        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: { name: string; isGlobal: boolean }[] = [];

        cache.insert = (...args) => {
            const [selector, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({ name: serialized.name, isGlobal: selector === "" });
            }

            return prevInsert(...args);
        };

        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };

        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        let dataAttribute = cache.key;

        const globals: { name: string; style: string }[] = [];

        for (const { name, isGlobal } of names) {
            const style = cache.inserted[name];

            if (typeof style !== "boolean") {
                if (isGlobal) {
                    globals.push({ name, style });
                } else {
                    styles += style;
                    dataAttribute += ` ${name}`;
                }
            }
        }

        return (
            <>
                {
                    globals.map(({ name, style }) => (
                        <style
                            key={cache.key}
                            data-emotion={`${cache.key}-global ${name}`}
                            dangerouslySetInnerHTML={{ __html: style }}
                        />
                    ))
                }
                {
                    styles !== '' && (
                        <style
                            key={cache.key}
                            data-emotion={dataAttribute}
                            dangerouslySetInnerHTML={{ __html: styles }}
                        />
                    )
                }
            </>
        );
    });

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
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </ThemeContext.Provider>
    );
}