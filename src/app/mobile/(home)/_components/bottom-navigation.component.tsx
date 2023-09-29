"use client"

import { darkTheme } from "@/app/themes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation as MatBottomNavigation, BottomNavigationAction, Paper, useTheme, ThemeProvider } from "@mui/material";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";

export function TabScreen({ children, hidden }: PropsWithChildren & { hidden?: boolean }) {
    return (
        <div className={classNames(
            "h-full",
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
    const [tab, setTab] = useState(tabs[0].tabValue);

    const currentTab = tabs.find(t => t.tabValue == tab);
    const currentTheme = useTheme();
    const tabTheme = currentTab?.darkTheme ? darkTheme : currentTheme;

    const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    }

    return (
        <ThemeProvider theme={tabTheme}>
            <div className='flex flex-col h-full'>
                <div className="h-full overflow-auto">
                    {
                        tabs.map((t, index) => {
                            if (!t.destroyOnHide || tab == t.tabValue) {
                                return (
                                    <TabScreen key={index} hidden={tab != t.tabValue}>
                                        {t.screen}
                                    </TabScreen>
                                )
                            }
                        })
                    }
                </div>

                <Paper elevation={5}>
                    <MatBottomNavigation sx={{ height: 65, pb: 1 }} value={tab} onChange={onTabChange}>
                        {
                            tabs.map((t, index) =>
                                <BottomNavigationAction
                                    disableRipple={true}
                                    key={index}
                                    value={t.tabValue}
                                    label={t.tabLabel}
                                    icon={t.tabIcon ? <FontAwesomeIcon icon={t.tabIcon} fontSize={20} /> : undefined}
                                />
                            )
                        }
                    </MatBottomNavigation>
                </Paper>
            </div>
        </ThemeProvider>
    )
}