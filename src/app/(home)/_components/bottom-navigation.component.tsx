"use client"

import { darkTheme } from "@/app/themes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation as MatBottomNavigation, BottomNavigationAction, Paper, useTheme, ThemeProvider, CssBaseline, ScopedCssBaseline } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export function TabScreen({ children, hidden }: PropsWithChildren & { hidden?: boolean }) {
    return (
        <div className={classNames(
            "h-full overflow-hidden",
            {
                "hidden": hidden
            }
        )}>
            {children}
        </div>
    )
}

export type Tab = {
    screen: React.ReactNode,
    tabValue: string,
    tabIcon?: IconProp,
    tabLabel?: string,
    darkTheme?: boolean,
    destroyOnHide?: boolean
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
            <ScopedCssBaseline className="flex flex-col h-full">
                <div className="h-full overflow-hidden">
                    {
                        tabs.map((t, index) => {
                            if (!t.destroyOnHide || tab?.tabValue == t.tabValue) {
                                return (
                                    <TabScreen key={index} hidden={tab?.tabValue != t.tabValue}>
                                        {t.screen}
                                    </TabScreen>
                                )
                            }
                        })
                    }
                </div>

                <Paper elevation={5}>
                    <MatBottomNavigation className="pb-sab-or-14 pt-4 h-auto" value={tab} onChange={onTabChange}>
                        {
                            tabs.map((t, index) =>
                                <BottomNavigationAction
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