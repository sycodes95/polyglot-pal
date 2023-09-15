type SidebarProps = {
  className?: string
}

export default function Sidebar ({className} : SidebarProps) {
  return (
    <div className={`${className} m-2 p-2  w-80  rounded-2xl`}>
      Saved Conversations
    </div>
  )
}