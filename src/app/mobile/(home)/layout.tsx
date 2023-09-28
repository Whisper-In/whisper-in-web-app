import { faCamera, faComment, faHome, faMagnifyingGlass, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import BottomNavigation from './_components/bottom-navigation.component'

export default function MobileHomeLayout(props: {
  children: React.ReactNode,
  explore: React.ReactNode,
  chats: React.ReactNode,
  post: React.ReactNode,
  me: React.ReactNode
}) {
  return (
    <div className='flex flex-col h-full'>
      <div className="h-full w-screen overflow-x-hidden overflow-y-auto">
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
            screen: props.post
          },
          {
            tabValue: "chats",
            tabIcon: faComment,
            screen: props.chats
          },
          {
            tabValue: "me",
            tabIcon: faUser,
            screen: props.me
          }
        ]} />
      </div>
    </div>
  )
}
