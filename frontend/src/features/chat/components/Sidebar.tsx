interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sidebar = ( { children, className } : SidebarProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}