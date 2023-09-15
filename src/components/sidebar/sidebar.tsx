type SidebarProps = {
  className?: string
}

export default function Sidebar ({className} : SidebarProps) {
  return (
    <div className={`${className} p-2 w-80`}>
      testing
    </div>
  )
}