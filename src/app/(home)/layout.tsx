import { faCamera, faComment, faHome, faMagnifyingGlass, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import BottomNavigation from './_components/bottom-navigation.component'
import { Container } from '@mui/material'

export default function MobileHomeLayout(props: {
  children: React.ReactNode,
  explore: React.ReactNode,
  chats: React.ReactNode,
  post: React.ReactNode,
  me: React.ReactNode
}) {
  return (
    <main className="h-full w-full overflow-hidden">
      <BottomNavigation tabs={[
        {
          tabValue: "feed",
          tabIcon: faHome,
          screen: props.children,
          darkTheme: true
        },
        {
          tabValue: "explore",
          tabIcon: faMagnifyingGlass,
          screen: props.explore
        },
        {
          tabValue: "create-post",
          tabIcon: faCamera,
          screen: props.post,
          darkTheme: true
        },
        {
          tabValue: "chats",
          tabIcon: faComment,
          screen: props.chats,
          destroyOnHide: true
        },
        {
          tabValue: "me",
          tabIcon: faUser,
          screen: props.me,
          destroyOnHide: true
        }
      ]} />
    </main>
  )
}
