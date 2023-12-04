import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { Squash as Hamburger} from 'hamburger-react'

import { ModeToggle } from "./modeToggle";
import UserDropdown from "./userDropdown";
import MobileLogo from "./mobileLogo";
import { User, useAuth0 } from "@auth0/auth0-react";
import Logo from "./logo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  showMobileSideBar: boolean;
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
}

export default function Header({ 
  showMobileSideBar, 
  setShowMobileSideBar, 
  user
}: HeaderProps) {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div className="top-0 z-10 flex items-center justify-center w-full h-16 border-b border-border bg-background">
      {
      user ? 
      <div className="relative flex justify-between w-full p-4 max-w-7xl">
        
        <Logo 
        showMobileSideBar={showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
        />
        <MobileLogo className="absolute gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:hidden" />       

        <div className="flex justify-end w-full gap-8">
          <ModeToggle />
          <UserDropdown />
        </div>
        
      </div>
      :
      <div className="relative flex items-center justify-between w-full p-4 max-w-7xl">
        <Logo 
        showMobileSideBar={showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
        showHamburger={false}
        />
        <MobileLogo className="flex items-center md:hidden" />
        <div className="flex items-center justify-end w-full ">
          <button className="h-8 p-2 text-xs font-normal transition-all duration-300 bg-red-400 border border-red-500 rounded-lg w-fit bg-opacity-20 text-primary font-main " onClick={()=> {
            loginWithRedirect();
            }}>
            Log In / Sign Up
          </button>
          
        </div>

      </div>
      }
    </div>
  );
}
