import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Squash as Hamburger} from 'hamburger-react'

export default function Header() {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className="sticky top-0 z-10 flex items-center justify-center w-full h-16 bg-primary">
      <div className="flex justify-between w-full p-2 max-w-7xl">
        <div className="md:hidden text-secondary">
          <Hamburger toggled={menuIsOpen} toggle={()=> setMenuIsOpen(!menuIsOpen)} />
        </div>
        <div className="items-center hidden gap-2 md:flex left-1/2">
          <Icon className="text-secondary " path={mdiEarth} size={1.5} />
          <span className="hidden text-lg md:flex md:text-3xl font-logo text-secondary whitespace-nowrap">
            Polyglot Pal
          </span>
        </div>

        <div className="absolute gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 md:hidden left-1/2">
          <Icon className="text-secondary" path={mdiEarth} size={1.5} />
        </div>
        {
        user && 
          <button className="relative z-50 flex items-center gap-2 cursor-pointer text-secondary" onClick={()=> setUserMenuIsOpen(!userMenuIsOpen)}>
            <span>{user?.given_name}</span>
            <img className="object-contain w-8 h-8 rounded-full" src={user.picture} alt="user-picture" />
            {
            userMenuIsOpen &&
              <>
                <ul className="absolute right-0 z-50 flex flex-col gap-1 p-4 bg-white border rounded-lg cursor-default whitespace-nowrap top-full border-stone-300">
                  <li className="z-50 text-xs text-red-400 transition-all cursor-pointer hover:text-red-600" onClick={()=> logout({ logoutParams: { returnTo: `${import.meta.env.VITE_DOMAIN}/log-in`} })}>Log Out</li>
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
