import { axiosInstance } from '@api/axiosInstance'
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from '@api/index'
import { 
  ISignup, 
  ISignin, 
  SigninResponse, 
  MessageResponse 
} from 'src/types'

export const signupUser = async (data: ISignup): Promise<MessageResponse> => {
  const response = await axiosInstance.post(REGISTER_ENDPOINT, data);
  return response.data;
}

export const signinUser = async (data: ISignin): Promise<SigninResponse> => {
  const response = await axiosInstance.post(LOGIN_ENDPOINT, data);
  return response.data;
}

export const signoutUser = async () => {
  const response = await axiosInstance.post(LOGOUT_ENDPOINT, null);
  return response.data
}