import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation } from "react-query";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { getErrorStatusMessage } from "../../../utils/getErrorStatusMessage";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field is empty"
  }),
  password: z.string().min(1, {
    message: "Password field is empty"
  })
});

export const Login = () => {

  const { loginUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const loginMutation = useMutation(
    async (formData: typeof formSchema._type) => loginUser(formData.username, formData.password),
    {
      onSuccess: () => console.log("login success"),
      onError: (err: AxiosError) => {
        setErrorMsg(getErrorStatusMessage(err));
      },
    }
  );

  const username = form.watch("username");
  const password = form.watch("password");

  useEffect(() => {
    // reset error msg when user edits form inputs
    if(username || password) setErrorMsg("");
  },[username, password]);

  const loginSubmit = (formData: typeof formSchema._type) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="text-white bg-background rounded-sm  w-96 min-h-[400px] flex flex-col
    items-center">

      <div className="flex flex-col gap-4 w-full items-center bg-black/50 p-6">
        <Icon className="text-white blur-[0.5px]" path={mdiEarth} size={3} />
        <h1 className="text-2xl font-display-2 font-semibold  pt-2 pb-2 text-center  w-full">Welcome</h1>
        <span className="text-sm p-2 font-semibold rounded-sm  w-full text-center border border-border/20 bg-border/10">Log in to continue to PolyglotPal.</span>
      </div>
      
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-4 w-full p-6">

          {
            errorMsg &&
            <span className="flex justify-center w-full text-sm text-red-600">{errorMsg}</span> 
          }

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage className=" font-normal text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage className=" font-normal text-xs" />
              </FormItem>
            )}
          />
          <Button className="bg-black w-full hover:bg-black/50" type="submit">Continue</Button>
          <div className=" w-full flex justify-center text-xs hover:text-red-500 transition-colors">
            <Link to={"/register"}>
              Don't have an account? Register here.
            </Link>
          </div>
        </form>
        
      </Form>
      
    </div>
  );
};