import { axiosInstance } from '@api/axiosInstance'
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse
} from '@api/index'

export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post(REGISTER_ENDPOINT, data);
  return response.data;
}

export const signinUser = async (data: SigninRequest): Promise<SigninResponse> => {
  const response = await axiosInstance.post(LOGIN_ENDPOINT, data);
  return response.data;
}

export const signoutUser = async () => {
  const response = await axiosInstance.post(LOGOUT_ENDPOINT, null);
  return response.data
}