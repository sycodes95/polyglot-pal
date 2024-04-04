import { AxiosError } from "axios";

export const getErrorStatusMessage = (err: AxiosError) => {
  if(err.response?.status === 401) return "Incorrect username or password."
  return ""
}