"use client"

import { darkTheme } from "@/app/themes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation as MatBottomNavigation, BottomNavigationAction, Paper, useTheme, ThemeProvider, CssBaseline, ScopedCssBaseline, Toolbar, Stack, Container, Box } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export function TabScreen({
    children,
    hidden,
}: {
    hidden?: boolean
} & PropsWithChildren) {
    return (
        <Stack sx={{
            display: hidden ? "none" : undefined
        }} flexGrow={1}>
            {children}
        </Stack>
    )
}

export type Tab = {
    screen: React.ReactNode,
    tabValue: string,
    tabIcon?: IconProp,
    tabLabel?: string,
    darkTheme?: boolean,
    destroyOnHide?: boolean,
    disableBottomPadding?: boolean,
}

export default function BottomNavigation({ tabs }: { tabs: Tab[] }) {
    const [tab, setTab] = useState<Tab | undefined>(undefined);
    const router = useRouter();

    const currentTheme = useTheme();
    const tabTheme = tab?.darkTheme ? darkTheme : currentTheme;

    const onTabChange = (event: React.SyntheticEvent, newValue: Tab) => {
        setTab(newValue);
        router.push(`#${newValue.tabValue}`);
    }

    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (hash != tab?.tabValue) {
            const newTab = tabs.find((t) => t.tabValue == hash);

            if (newTab) {
                setTab(newTab);
            } else {
                setTab(tabs[0]);
            }
        }
    }, []);

    return (
        <ThemeProvider theme={tabTheme}>
            <ScopedCssBaseline component={Stack} minHeight="100dvh">
                {
                    tabs.map((t, index) => {
                        if (!t.destroyOnHide || tab?.tabValue == t.tabValue) {
                            return (
                                <TabScreen key={index}
                                    hidden={tab?.tabValue != t.tabValue}>
                                    {t.screen}
                                </TabScreen>
                            )
                        }
                    })
                }

                {
                    !tab?.disableBottomPadding &&
                    <Toolbar />
                }

                <Paper elevation={5} sx={{
                    position: "fixed",
                    bottom: 0
                }}>
                    <MatBottomNavigation className="pb-sab-or-14 pt-4 h-auto" value={tab} onChange={onTabChange}>
                        {
                            tabs.map((t, index) =>
                                <BottomNavigationAction
                                    aria-label={t.tabLabel || t.tabValue}
                                    disableRipple={true}
                                    key={index}
                                    value={t}
                                    label={t.tabLabel}
                                    icon={t.tabIcon ? <FontAwesomeIcon icon={t.tabIcon} fontSize={20} /> : undefined}
                                />
                            )
                        }
                    </MatBottomNavigation>
                </Paper>
            </ScopedCssBaseline>
        </ThemeProvider>
    )
}