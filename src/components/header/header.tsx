import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Squash as Hamburger} from 'hamburger-react'

import { ModeToggle } from "./modeToggle";
import UserDropdown from "./userDropdown";
import MobileLogo from "./mobileLogo";

type HeaderProps = {
  showMobileSideBar: boolean,
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ showMobileSideBar, setShowMobileSideBar}: HeaderProps) {
  

  return (
    <div className="top-0 z-10 flex items-center justify-center w-full h-16 border-b border-border bg-background">
      <div className="relative flex justify-between w-full p-2 max-w-7xl">
        <div className="md:hidden text-primary">
          <Hamburger toggled={showMobileSideBar} toggle={()=> setShowMobileSideBar(!showMobileSideBar)} />
        </div>
        <a href={import.meta.env.VITE_DOMAIN} className="items-center hidden gap-2 md:flex left-1/2">
          <Icon className="text-primary " path={mdiEarth} size={1.5} />
          <span className="hidden text-lg md:flex md:text-3xl font-logo text-primary whitespace-nowrap">
            Polyglot Pal
          </span>
        </a>

        <MobileLogo />       

        <div className="flex justify-end w-full gap-8">
          <ModeToggle />
          <UserDropdown />
        </div>

        
        
      </div>
    </div>
  );
}
