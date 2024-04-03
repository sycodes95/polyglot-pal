import { User } from "lucide-react";
import { UserProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/components/themeProvider/theme-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps ) => {
  return (
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>

  );
};
