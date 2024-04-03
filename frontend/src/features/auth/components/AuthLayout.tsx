interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ( { children }: AuthLayoutProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center min-h-screen bg-black">
      {children}
    </div>
  )
}