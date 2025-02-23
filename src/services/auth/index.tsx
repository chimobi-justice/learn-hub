import { axiosInstance } from '@api/axiosInstance'

import { handleResponse } from '@utils/apiHelpers'
import { 
  ISignup, 
  ISignin, 
  SigninResponse, 
  MessageResponse 
} from 'src/types'

export const signupUser = (data: ISignup) => {
  return handleResponse<MessageResponse>(axiosInstance.post('/auth/register', data));
}

export const signinUser = (data: ISignin) => {
  return handleResponse<SigninResponse>(axiosInstance.post('/auth/login', data));
}

export const signoutUser = () => {
  return handleResponse<MessageResponse>(axiosInstance.post('/auth/logout', null));
}