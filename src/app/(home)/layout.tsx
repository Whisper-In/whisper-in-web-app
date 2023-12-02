import { faCamera, faComment, faHome, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import BottomNavigation from './_components/bottom-navigation.component'

export default function MobileHomeLayout(props: {
  children: React.ReactNode,
  explore: React.ReactNode,
  chats: React.ReactNode,
  post: React.ReactNode,
  me: React.ReactNode
}) {
  return (
    <BottomNavigation tabs={[
      {
        tabValue: "feed",
        tabIcon: faHome,
        screen: props.children,
        darkTheme: true,
        disableBottomPadding: true,
        tabLabel: "Feed"
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
        darkTheme: true,
        disableBottomPadding: true
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
  )
}
