import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { Squash as Hamburger} from 'hamburger-react'

import { ModeToggle } from "./modeToggle";
import UserDropdown from "./userDropdown";
import MobileLogo from "./mobileLogo";
import { User, useAuth0 } from "@auth0/auth0-react";
import Logo from "./logo";

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

      
      <div className="relative flex justify-between w-full p-2 max-w-7xl">
        
        <Logo 
        showMobileSideBar={showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
        />
        <MobileLogo />       

        <div className="flex justify-end w-full gap-8">
          <ModeToggle />
          <UserDropdown />
        </div>
        
      </div>
      :
      <div className="relative flex items-center justify-between w-full p-2 max-w-7xl">
        <Logo 
        showMobileSideBar={showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
        showHamburger={false}
        />
        <MobileLogo />  
        <div className="flex items-center justify-end w-full ">
          <button className="flex items-center h-full p-1 pl-2 pr-2 text-xs transition-all duration-300 bg-red-400 border border-red-500 rounded-lg w-fit text-background" onClick={()=> {
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
