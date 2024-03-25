import { useAuth0 } from "@auth0/auth0-react";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";


export default function LandingPageHeader () {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-between w-full h-20 p-4 border-b max-w-7xl border-border">
      <div className="flex gap-2 text-white text-opacity-80">
        <Icon className="" path={mdiEarth} size={1.5} />
        <span className="text-4xl font-logo whitespace-nowrap">
          Polyglot Pal
        </span>

      </div>
      <div className="flex justify-end w-full">
        <button className="w-40 text-xs transition-all duration-300 bg-red-400 border border-red-500 rounded-lg text-background glow-box" onClick={()=> {
          loginWithRedirect();
          }}>
          Log In / Sign Up
        </button>
        
      </div>

      <div className="">

      </div>
      
    </div>
  )
}