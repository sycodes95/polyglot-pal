import { useAuth0 } from "@auth0/auth0-react";

export default function SignUpButton () {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-center w-full">
      <button className="w-40 h-8 text-xs font-normal transition-all duration-300 bg-red-400 border border-red-500 rounded-lg bg-opacity-20 text-primary font-main glow-box-red" onClick={()=> {
        loginWithRedirect();
        }}>
        Sign Me Up!
      </button>
      
    </div>
  )
}