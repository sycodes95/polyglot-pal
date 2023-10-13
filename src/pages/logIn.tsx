import { useAuth0 } from "@auth0/auth0-react";
import { mdiEarth } from "@mdi/js";
import Icon from "@mdi/react";
import Globe from "react-globe.gl";

export default function LogIn () {
  const { loginWithRedirect } = useAuth0();

  // const handleLoginClick = async () => {
  //   await loginWithRedirect();
  // };

  return (
    <div className="absolute top-0 left-0 z-50 flex w-full h-full bg-white min-h-screen-d">
      <div className="relative hidden w-full h-full p-4 md:flex md:flex-col">
        <div className="flex gap-2">
          <Icon className="text-stone-700" path={mdiEarth} size={1.5} />
          <span className="text-4xl font-logo text-stone-700">
            Polyglot Pal
          </span>
        </div>
        <div className="relative flex flex-col justify-center h-full p-8 font-display">
          <div className="z-50">
            <p className="text-4xl text-stone-700">
              Practice conversation skills 
            </p>
            <p className="text-4xl text-stone-700">
              in the language of your choice 
            </p>
            <p className="text-4xl text-stone-700">
              from the comfort of your home.
            </p>
          </div>
          
          <div className="fixed left-0 -translate-y-1/2 top-1/2">
            <Globe
            height={800} 
            backgroundColor="rgba(0,0,0,0)"
            />
          </div>

        </div>

      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-black md:w-1/3">
        <div className="absolute top-0 left-0 flex items-center gap-2 p-2 text-white md:hidden">
          <Icon className="" path={mdiEarth} size={1} />
          <span className="text-2xl font-logo ">
            Polyglot Pal
          </span>
        </div>
        <span className="text-2xl text-white font-display">Get Started</span>
        <button className="w-40 h-12 rounded-lg bg-emerald-400 " onClick={()=> {
          loginWithRedirect();
          }}>
          Log In
        </button>

      </div>
      
    </div>
  )
}