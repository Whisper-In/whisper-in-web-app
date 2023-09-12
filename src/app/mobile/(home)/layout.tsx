"use client"

import { faCog, faComment, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BottomNavigation, BottomNavigationAction, Paper, Tab } from '@mui/material'
import classNames from 'classnames'
import { useParams, useRouter } from 'next/navigation'
import { useState, PropsWithChildren, useEffect } from "react"

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

export default function MobileHomeLayout(props: {
  children: React.ReactNode,
  explore: React.ReactNode,
  chats: React.ReactNode,
  settings: React.ReactNode
}) {  
  const [tab, setTab] = useState<"feed" | "explore" | "chats" | "settings">("feed");

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

      <Paper sx={{ bottom: 0 }} elevation={5}>
        <BottomNavigation value={tab} onChange={(event, newValue) => setTab(newValue)}>
          <BottomNavigationAction value="feed" icon={<FontAwesomeIcon icon={faHome} fontSize={20} />} />
          <BottomNavigationAction value="explore" icon={<FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />} />
          <BottomNavigationAction value="chats" icon={<FontAwesomeIcon icon={faComment} fontSize={20} />} />
          <BottomNavigationAction value="settings" icon={<FontAwesomeIcon icon={faCog} fontSize={20} />} />
        </BottomNavigation>
      </Paper>

      {/* <BottomNavigation links={[
        { label: "Recommended", icon: faHome, href: "/" },
        { label: "Explore", icon: faMagnifyingGlass, href: "/explore" },
        { label: "Chats", icon: faComment, href: "/chats" },
        { label: "Settings", icon: faCog, href: "/settings" }
      ]} hideLabels={true} /> */}
    </div>
  )
}
