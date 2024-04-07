import axios, { AxiosError } from 'axios'
import { UserProfileToken } from '../types/User';
import { config } from '../config';
import { useMutation } from 'react-query';
import { useAuth } from '../hooks/useAuth';

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    
    const data = await axios.post<UserProfileToken>(config.API_DOMAIN + "account/register", {
      email,
      username,
      password
    });

    return data;

  } catch (err) {
    
    console.error("Error posting user registeration", err);

    throw err;
  }
};

export const useRegisterMutation = (
  email: string,
  username: string,
  password: string
) => {
  const { registerUser } = useAuth();
  return useMutation({
    ...config,
    mutationKey: ["register"],
    mutationFn: async ()=> registerUser(email, username, password)
  });
}; 

export const loginAPI = async (
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(config.API_DOMAIN + "account/login", {
      username,
      password
    });

    console.log(data)

    return data;

  } catch (err) {
    
    console.error("Error logging in user", err);

    throw err;
    // return error.response?.data;
  }
}

export const useLoginMutation = (
  username: string,
  password: string
) => {

  const { loginUser } = useAuth();
  return useMutation({
    ...config,
    mutationKey: ["register"],
    mutationFn: async ()=> loginUser(username, password)
  });
}; 