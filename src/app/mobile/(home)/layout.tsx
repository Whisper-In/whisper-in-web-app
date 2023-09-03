import BottomNavigation from '@/components/bottom-navigation.component'
import { faCog, faComment, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function MobileHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col h-full'>
      <div className="h-full overflow-auto">
        {children}
      </div>

      <BottomNavigation links={[
        { label: "Recommended", icon: faHome, href: "/" },
        { label: "Explore", icon: faMagnifyingGlass, href: "/explore" },
        { label: "Chats", icon: faComment, href: "/chats" },
        { label: "Settings", icon: faCog, href: "/settings" }
      ]} hideLabels={true} />
    </div>
  )
}
