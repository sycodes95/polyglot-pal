import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types/User";
import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../services/AuthService";
import axios from "axios";

interface UserContextType {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

type UserProviderProps = {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {

  const navigate = useNavigate(); 

  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile | null>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token"); 

    if(user && token)
    {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common.Authorization = "Bearer " + token;
    }

    setIsReady(true);

  },[]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
    .then(res => {

      if(res){
        const userName = res.data.userName;
        const email = res.data.email;
        const token = res.data.token;
        
        setUser({ userName, email });
        localStorage.setItem("user", JSON.stringify({ userName, email }));
        setToken(token);
        localStorage.setItem("token", token);

        navigate("/");

      }
      
    })
    .catch(err => console.error(err))
  }

  const loginUser = async (
    username: string,
    password: string
  ) => {
    await loginAPI(username, password)
    .then(res => {
      if(res) {

        const userName = res.data.userName;
        const email = res.data.email;
        const token = res.data.token;

        setUser({ userName, email });
        localStorage.setItem("user", JSON.stringify({ userName, email }));
        setToken(token);
        localStorage.setItem("token", token);

        navigate("/");
      }
    })
    .catch(err => console.error(err)); 
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider 
      value={{
        user,
        token,
        registerUser,
        loginUser,
        logout,
        isLoggedIn
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

