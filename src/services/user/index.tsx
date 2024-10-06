import { axiosInstance } from '@api/axiosInstance'
import { 
  DELETE_ACCOUNT_ENDPOINT, 
  FOLLOW_USERS_ENDPOINT, 
  GET_ALL_USERS_ENDPOINT, 
  GET_THREE_USERS_ENDPOINT, 
  ONFOLLOW_USERS_ENDPOINT, 
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

export const getThreeUsersOnCard = async () => {
  const response = await axiosInstance.get(GET_THREE_USERS_ENDPOINT);
  return response.data.data;
}

export const getAllFollowUsers = async (limit: number, page: number) => {
  const response = await axiosInstance.get(`${GET_ALL_USERS_ENDPOINT}?limit=${limit}&page=${page}`);
  const dataResponse = await response.data;
  return {...dataResponse, prevOffset: page}
}

export const createFollowUser = async (id: string) => {
  const response = await axiosInstance.post(`${FOLLOW_USERS_ENDPOINT}/${id}/follow`);
  return response.data;
}

export const createOnFollowUser = async (id: string) => {
  const response = await axiosInstance.post(`${ONFOLLOW_USERS_ENDPOINT}/${id}/unfollow`);
  return response.data;
}