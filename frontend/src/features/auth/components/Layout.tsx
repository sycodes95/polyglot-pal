interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ( { children }: LayoutProps) => {
  return (
    <div className="text-white bg-background rounded-sm w-96 min-h-[400px] flex flex-col
    items-center">
      {children}
    </div>
  )
}