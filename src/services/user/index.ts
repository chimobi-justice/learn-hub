import { axiosInstance } from '@api/axiosInstance'

import { getWithPagination, handleResponse } from '@utils/apiHelpers'
import { 
  IPassword, 
  IUser, 
  IUserProfile, 
  IUserProfileAvatar, 
  MessageResponse, 
  PeopleResponse
} from 'src/types'

// User-related API calls
export const  getUser = async () => {
 return await handleResponse<IUser>(axiosInstance.get('/users/me'));
}
export const getPublicUser = async (username: string) => {
  return await handleResponse<IUser>(axiosInstance.get(`/users/${username}`));
}
// Profile-related API calls
export const updateProfile = async (data: IUserProfile) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch('/users/accounts/update-profile', data));
}
export const updatePassword = async (data: IPassword) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch('/users/accounts/update-password', data));
}
export const uploadProfileAvatar = async (data: IUserProfileAvatar) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch('/users/accounts/upload-avatar', data));
}
export const deleteAccount = async () => {
  return await handleResponse(axiosInstance.delete('/users/accounts/delete'));
}
// Follow-related API calls
export const getThreeUsersOnCard = async () => {
  return await handleResponse<PeopleResponse>(axiosInstance.get('/users/get-three-users'));
}
export const getAllUsersToFollow = async (limit: number, page: number) => {
  return await getWithPagination('/users/all-users', limit, page);
}
export const getFollowingUsers = async (limit: number, page: number) => {
  return await getWithPagination('/users/followings', limit, page);
}
export const getFollowersUsers = async (limit: number, page: number) => {
  return await getWithPagination('/users/followers', limit, page);
}
export const getFollowedUsersArticles = async (limit: number, page: number) => {
  return await getWithPagination('/users/my-follow-users/articles', limit, page);
}
// Follow/unfollow actions
export const createFollowUser = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/users/${id}/follow`));
}
export const createOnFollowUser = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/users/${id}/unfollow`));
}