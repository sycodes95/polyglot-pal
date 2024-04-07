import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";

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
import { useLoginMutation } from "../../../services/AuthService";
import { useAuth } from "../../../hooks/useAuth";
import { FormErrorBox } from "./FormErrorBox";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field is empty"
  }),
  password: z.string().min(1, {
    message: "Password field is empty"
  })
});

export const LoginForm = () => {

  const { loginUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const loginMutatiion = useLoginMutation(
    form.getValues("username"), 
    form.getValues("password")
  );

  const username = form.watch("username");
  const password = form.watch("password");

  useEffect(() => {
    // reset error msg when user edits form inputs
    if(username || password) setErrorMsg("");
  },[username, password]);

  const handleLoginError = (error: AxiosError) => {
    setErrorMsg(error.response?.data as string);
  }

  useEffect(() => { 
    if(loginMutatiion.error) {
      handleLoginError(loginMutatiion.error as AxiosError);
    }
  },[loginMutatiion.error])

  useEffect(() => {
    // if loginMutation is successful login the user using the form values
    if(loginMutatiion.isSuccess) {
      loginUser(form.getValues("username"), form.getValues("password"));
    }
  },[loginMutatiion.isSuccess])

  // const handleLoginSubmit = async () => {
  //   loginUser(form.getValues("username"), form.getValues("password"));
  // };
  
  return (
      
      <Form {...form}>
        <div className="flex flex-col gap-4 w-full items-center bg-black/50 p-6">
          <Icon className="text-white blur-[0.5px]" path={mdiEarth} size={3} />
          <h1 className="text-2xl font-display-2 font-semibold  pt-2 pb-2 text-center  w-full">Welcome</h1>
          <span className="text-sm p-2 font-semibold rounded-sm  w-full text-center border border-border/20 bg-border/10">Log in to continue to PolyglotPal.</span>
        </div>
        <form onSubmit={form.handleSubmit(()=> loginMutatiion.mutateAsync())} className="space-y-4 w-full p-6">

          {
            errorMsg &&
            <FormErrorBox message={errorMsg} />
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
  );
};