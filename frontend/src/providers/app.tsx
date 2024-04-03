import { User } from "lucide-react";
import { UserProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps ) => {
  return (
    <BrowserRouter>

      <UserProvider>
          {children}
      </UserProvider>
    </BrowserRouter>

  );
};
