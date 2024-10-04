import { axiosInstance } from '@api/axiosInstance'
import { 
  DELETE_ACCOUNT_ENDPOINT, 
  PUBLIC_USER_ENDPOINT, 
  UPDATE_PASSWORD_ENDPOINT, 
  UPDATE_PROFILE_ENDPOINT, 
  UPLOAD_PROFILE_AVATAR_ENDPOINT, 
  USER_ENDPOINT, 
} from '@api/index'
import { 
  IPassword, 
  IUser, 
  IUserProfile, 
  IUserProfileAvatar, 
  MessageResponse 
} from 'src/types'

export const getUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get<IUser>(USER_ENDPOINT);
  return response.data;
}

export const updatePassword = async (data: IPassword): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPDATE_PASSWORD_ENDPOINT, data);
  return response.data;
}

export const updateProfile = async (data: IUserProfile): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPDATE_PROFILE_ENDPOINT, data);
  return response.data;
}

export const uploadProfileAvatar = async (data: IUserProfileAvatar): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPLOAD_PROFILE_AVATAR_ENDPOINT, data);
  return response.data;
}

export const deleteAccount = async () => {
  const response = await axiosInstance.delete(DELETE_ACCOUNT_ENDPOINT);
  return response.data;
}

export const getPublicUser = async (username: string): Promise<IUser> => {
  const response = await axiosInstance.get<IUser>(`${PUBLIC_USER_ENDPOINT}/${username}`);
  return response.data;
}