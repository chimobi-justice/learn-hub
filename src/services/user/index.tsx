import { axiosInstance } from '@api/axiosInstance'
import { 
  DELETE_ACCOUNT_ENDPOINT, 
  MessageResponse, 
  PUBLIC_USER_ENDPOINT, 
  UPDATE_PASSWORD_ENDPOINT, 
  UPDATE_PROFILE_ENDPOINT, 
  UPLOAD_PROFILE_AVATAR_ENDPOINT, 
  USER_ENDPOINT, 
  UpdatePasswordRequest, 
  UpdateProfileAvatarRequest, 
  UpdateProfileRequest, 
  UserResponse 
} from '@api/index'

export const getUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>(USER_ENDPOINT);
  return response.data;
}

export const updatePassword = async (data: UpdatePasswordRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPDATE_PASSWORD_ENDPOINT, data);
  return response.data;
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPDATE_PROFILE_ENDPOINT, data);
  return response.data;
}

export const uploadProfileAvatar = async (data: UpdateProfileAvatarRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(UPLOAD_PROFILE_AVATAR_ENDPOINT, data);
  return response.data;
}

export const deleteAccount = async () => {
  const response = await axiosInstance.delete(DELETE_ACCOUNT_ENDPOINT);
  return response.data;
}

export const getPublicUser = async (username: string): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>(`${PUBLIC_USER_ENDPOINT}/${username}`);
  return response.data;
}