import { axiosInstance } from '@api/axiosInstance'
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from '@api/index'
import { handleResponse } from '@utils/apiHelpers'
import { 
  ISignup, 
  ISignin, 
  SigninResponse, 
  MessageResponse 
} from 'src/types'

export const signupUser = (data: ISignup) => {
  return handleResponse<MessageResponse>(axiosInstance.post(REGISTER_ENDPOINT, data));
}

export const signinUser = (data: ISignin) => {
  return handleResponse<SigninResponse>(axiosInstance.post(LOGIN_ENDPOINT, data));
}

export const signoutUser = () => {
  return handleResponse<MessageResponse>(axiosInstance.post(LOGOUT_ENDPOINT, null));
}