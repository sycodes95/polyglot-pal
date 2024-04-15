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
import { RegisterPwChecker } from "../components/RegisterPwChecker";
import { useRegisterMutation } from "../../../services/AuthService";
import { FormErrorBox } from "./FormErrorBox";

export const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email field is empty"
  }).email(),
  username: z.string().min(1, {
    message: "Username field is empty"
  }),
  password: z.string().min(1, {
    message: "Password field must be more than 6 characters."
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter."
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter."
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one digit."
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character."
  }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});


export const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const [showPwChecker, setShowPwChecker] = useState(false);

  const registerMutation = useRegisterMutation(
    form.getValues("email"),
    form.getValues("username"),
    form.getValues("password")
  );

  const email = form.watch("email");
  const username = form.watch("username");
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    // reset error msg when user edits form inputs
    if(email || username || password) {
      setErrorMsg("");
    }
    // display pw checker if there is input value
    if(password) setShowPwChecker(true);

  },[email, username, password, confirmPassword]);

  const handleErrors = (error: AxiosError ) => {
    setErrorMsg(error.response?.data as string)
  };

  useEffect(() => {
    if(registerMutation.error) {
      handleErrors(registerMutation.error as AxiosError);
    }
  },[registerMutation.error]);

  return(
    <Form {...form}>
      <div className="flex flex-col gap-4 w-full items-center bg-black/50 p-6">
        <Icon className="text-yellow-100 blur-[0.5px]" path={mdiEarth} size={3} />
        <h1 className="text-2xl font-display-2 font-semibold  pt-2 pb-2 text-center  w-full">Welcome</h1>
        <span className="text-sm p-2 font-semibold rounded-sm  w-full text-center border border-border/20 bg-border/10">Register to continue to PolyglotPal.</span>
      </div>
      <form onSubmit={form.handleSubmit(()=> registerMutation.mutate())} className="space-y-4 w-full p-6">

        {
          errorMsg &&
          <FormErrorBox message={errorMsg} />
        }

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-100">Email</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className=" font-normal text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-100">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className=" font-normal text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-100">Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className=" font-normal text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-100">Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className=" font-normal text-sm" />
            </FormItem>
          )}
        />

        <RegisterPwChecker show={showPwChecker} form={form} />

        <Button className="bg-black w-full hover:bg-black/50" type="submit">Continue</Button>

        <div className=" w-full flex justify-center text-sm hover:text-red-500 transition-colors">
          <Link to={"/login"}>
            Already have an account? Log In Here.
          </Link>
        </div>

      </form>
      
    </Form>
  );
};