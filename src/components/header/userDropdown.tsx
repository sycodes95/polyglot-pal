import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function UserDropdown () {

  const { user } = useAuth0();
  const { logout } = useAuth0();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  return (
    <>
      {
        user && 
        <button className="relative z-50 flex items-center gap-2 cursor-pointer text-primary" onClick={()=> setUserMenuIsOpen(!userMenuIsOpen)}>

          <span>{user?.given_name}</span>

          <img className="object-contain w-8 h-8 rounded-full" src={user.picture} alt="" />

          {
          userMenuIsOpen &&
            <>
              <ul className="absolute right-0 z-50 flex flex-col gap-1 p-4 border rounded-lg cursor-default border-border bg-background whitespace-nowrap top-full ">
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
    
    </>
  )
}