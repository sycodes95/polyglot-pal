import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FormPwCheckerProps {
  form: UseFormReturn<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }, any, undefined>,
  show: boolean
}

export const RegisterPwChecker = ({ form, show = false } : FormPwCheckerProps) => {

  const password = form.watch("password");

  const [isMinLength, setIsMinLength] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  useEffect(() => {

    //check password validation (real time check)
    const minLength = password.length > 6;
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const digit = /[0-9]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);

    setIsMinLength(minLength);
    setHasLowercase(lowercase);
    setHasUppercase(uppercase);
    setHasDigit(digit);
    setHasSpecialChar(specialChar);
  }, [password]);


  return (
    <>
      {
      show &&
      <div className="p-4 border border-border bg-border rounded-md text-sm text-yellow-100/50 flex flex-col gap-2">
        <span className="text-yellow-100">Your password must contain:</span>
        <div className="flex flex-col gap-2">
          <li className={`${isMinLength ? "text-green-500" : "text-yellow-100/50"}`}>More than 6 characters.</li>
        </div>

        <span className=" text-yellow-100">Atleast one of the following:</span>  

        <div className="flex flex-col gap-2">
          
          <li className={`${hasLowercase ? "text-green-500" : "text-yellow-100/50"}`}>- Lowercase letters (a - z)</li>
          <li className={`${hasUppercase ? "text-green-500" : "text-yellow-100/50"}`}>- Lowercase letters (A - Z)</li>
          <li className={`${hasDigit ? "text-green-500" : "text-yellow-100/50"}`}>- Numbers (0-9)</li>
          <li className={`${hasSpecialChar ? "text-green-500" : "text-yellow-100/50"}`}>- Special characters (e.g. !@#$%^&*)</li>

        </div>
        
      </div>
      }
    </>
  );
};