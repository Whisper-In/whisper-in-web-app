"use client"

import { useAppTheme } from '@/app/theme-provider'
import { useAppSelector } from '@/store/hooks'
import { setDarkMode } from '@/store/slices/app.slice'
import { faCog, faComment, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BottomNavigation, BottomNavigationAction, Paper, Tab, useTheme } from '@mui/material'
import classNames from 'classnames'
import { useState, PropsWithChildren, useEffect } from "react"
import { useDispatch } from 'react-redux'

function TabScreen({ children, hidden }: PropsWithChildren & { hidden?: boolean }) {
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

type TabType = "feed" | "explore" | "chats" | "settings";

export default function MobileHomeLayout(props: {
  children: React.ReactNode,
  explore: React.ReactNode,
  chats: React.ReactNode,
  settings: React.ReactNode
}) {
  const theme = useTheme();
  const settingsDarkMode = useAppSelector((state) => state.app.darkMode);
  const { setDarkMode } = useAppTheme();
  const [tab, setTab] = useState<TabType>("feed");

  const onTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setTab(newValue);
  }

  const checkTabDarkMode = () => {
    if (tab == "feed") {
      setDarkMode(true);
    } else {
      setDarkMode(settingsDarkMode);
    }
  }

  useEffect(() => {
    checkTabDarkMode();
  }, [tab]);

  return (
    <div className='flex flex-col h-full'>
      <div className="h-full overflow-auto">
        <TabScreen hidden={tab != "feed"}>
          {props.children}
        </TabScreen>
        <TabScreen hidden={tab != "explore"}>
          {props.explore}
        </TabScreen>
        <TabScreen hidden={tab != "chats"}>
          {props.chats}
        </TabScreen>
        <TabScreen hidden={tab != "settings"}>
          {props.settings}
        </TabScreen>
      </div>

      <Paper sx={{
        border: 1,
        borderColor: theme.palette.background.paper
      }} elevation={5}>
        <BottomNavigation value={tab} onChange={onTabChange} >
          <BottomNavigationAction value="feed" icon={<FontAwesomeIcon icon={faHome} fontSize={20} />} />
          <BottomNavigationAction value="explore" icon={<FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />} />
          <BottomNavigationAction value="chats" icon={<FontAwesomeIcon icon={faComment} fontSize={20} />} />
          <BottomNavigationAction value="settings" icon={<FontAwesomeIcon icon={faCog} fontSize={20} />} />
        </BottomNavigation>
      </Paper>
    </div>
  )
}
