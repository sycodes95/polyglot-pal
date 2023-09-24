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
    <div className="sticky top-0 z-10 flex items-center justify-center w-full h-20 bg-white">
      <div className="flex justify-between w-full p-2 max-w-7xl">
        <div className="md:hidden text-stone-700">
          <Hamburger toggled={menuIsOpen} toggle={()=> setMenuIsOpen(!menuIsOpen)} />
        </div>
        <div className="flex items-center gap-2">
          <Icon className="text-stone-700" path={mdiEarth} size={1} />
          <span className="text-lg md:text-3xl font-logo text-stone-700 whitespace-nowrap">
            Polyglot Pal
          </span>
        </div>
        {
        user && 
          <button className="relative z-50 flex items-center gap-2 cursor-pointer" onClick={()=> setUserMenuIsOpen(!userMenuIsOpen)}>
            <span>{user?.given_name}</span>
            <img className="object-contain w-8 h-8 rounded-full" src={user.picture} alt="user-picture" />
            {
            userMenuIsOpen &&
              <>
                <ul className="absolute right-0 z-50 flex flex-col gap-1 p-4 bg-white border rounded-lg cursor-default whitespace-nowrap top-full border-stone-300">
                  <li className="z-50 text-xs text-red-400 transition-all cursor-pointer hover:text-red-600" onClick={()=> logout({ logoutParams: { returnTo: 'http://localhost:5173/log-in' } })}>Log Out</li>
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
