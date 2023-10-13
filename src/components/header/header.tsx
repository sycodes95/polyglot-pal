import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Squash as Hamburger} from 'hamburger-react'

type HeaderProps = {
  showMobileSideBar: boolean,
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ showMobileSideBar, setShowMobileSideBar}: HeaderProps) {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className="top-0 z-10 flex items-center justify-center w-full h-16 bg-background dark:bg-black dark:bg-opacity-20">
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

        <a href={import.meta.env.VITE_DOMAIN} className="absolute gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:hidden">
          <Icon className="text-primary" path={mdiEarth} size={1.5} />
        </a>
        {
        user && 
          <button className="relative z-50 flex items-center gap-2 cursor-pointer text-primary" onClick={()=> setUserMenuIsOpen(!userMenuIsOpen)}>
            <span>{user?.given_name}</span>
            <img className="object-contain w-8 h-8 rounded-full" src={user.picture} alt="" />
            {
            userMenuIsOpen &&
              <>
                <ul className="absolute right-0 z-50 flex flex-col gap-1 p-4 bg-white border rounded-lg cursor-default whitespace-nowrap top-full border-stone-300">
                  <li className="z-50 text-xs text-red-400 transition-all cursor-pointer hover:text-red-600" onClick={
                    ()=> {
                    window.onbeforeunload = null;
                    logout({ logoutParams: { returnTo: `${import.meta.env.VITE_DOMAIN}/log-in`} })
                    return false;
                  }}>Log Out</li>
                </ul>
              </>
              
            }
          </button>
        }
        {
        userMenuIsOpen && 
          <div className="fixed top-0 left-0 w-full h-full" onClick={()=> setUserMenuIsOpen(false)}></div>
        }
        
      </div>
    </div>
  );
}
