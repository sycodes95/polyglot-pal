import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";


export const Login = () => {

  const [ user, setUser ] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {

  },[]);

  const onUsernameChange = (username: string) => {
    setUser(prev => ({...prev, username}));
  }
  const onPasswordChange = (password: string) => {
    setUser(prev => ({...prev, password}));
  }
  return (
    <div className="text-white bg-foreground p-8 rounded-lg border border-border w-96 min-h-[400px] flex flex-col
    items-center gap-4">

      <div className="flex flex-col gap-4 w-full items-center">
        <Icon className="text-primary " path={mdiEarth} size={3} />
        <h1 className="text-2xl font-display-2  pt-2 pb-2 text-center  w-full">Welcome</h1>
        <span className="text-sm p-2 rounded-sm bg-white/5 w-full text-center border border-border">Log in to continue to PolyglotPal.</span>
      </div>
      <form className="w-full pt-4 pb-4 flex flex-col gap-4" action="">

        <div className="flex flex-col gap-2 w-full ">
          <label className="text-sm text-white" htmlFor="username">Username</label>
          <Input className="text-white border-border" name="username" onChange={(e)=> onUsernameChange(e.target.value)} value={user.username}/>

        </div>

        <div className="flex flex-col gap-2 w-full ">
          <label className="text-sm text-white" htmlFor="username">Password</label>
          <Input className="text-white border-border" name="username" onChange={(e)=> onPasswordChange(e.target.value)} value={user.password}/>
        </div>

      </form>
    </div>
  );
};