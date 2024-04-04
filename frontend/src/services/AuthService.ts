import axios, { AxiosError } from 'axios'
import { UserProfileToken } from '../types/User';

const api = "http://localhost:5187/api/"

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email,
      username,
      password
    });

    return data;

  } catch (error) {
    
    console.error("Error posting user registeration", error);

    return null;
  }
};

export const loginAPI = async (
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username,
      password
    });

    return data;

  } catch (err) {
    
    console.error("Error logging in user", err);

    throw err;
    // return error.response?.data;
  }
}