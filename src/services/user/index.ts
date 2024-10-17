import { axiosInstance } from '@api/axiosInstance'
import { 
  DELETE_ACCOUNT_ENDPOINT, 
  FOLLOW_USERS_ENDPOINT, 
  GET_ALL_USERS_TO_FOLLOW_ENDPOINT, 
  GET_FOLLOWERS_USERS_ENDPOINT, 
  Get_FOLLOWING_USERS_ARTICLES_ENDPOINT, 
  GET_FOLLOWING_USERS_ENDPOINT, 
  GET_THREE_USERS_ENDPOINT, 
  ONFOLLOW_USERS_ENDPOINT, 
  PUBLIC_USER_ENDPOINT, 
  UPDATE_PASSWORD_ENDPOINT, 
  UPDATE_PROFILE_ENDPOINT, 
  UPLOAD_PROFILE_AVATAR_ENDPOINT, 
  USER_ENDPOINT, 
} from '@api/index'
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
 return await handleResponse<IUser>(axiosInstance.get(USER_ENDPOINT));
}
export const getPublicUser = async (username: string) => {
  return await handleResponse<IUser>(axiosInstance.get(`${PUBLIC_USER_ENDPOINT}/${username}`));
}
// Profile-related API calls
export const updateProfile = async (data: IUserProfile) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(UPDATE_PROFILE_ENDPOINT, data));
}
export const updatePassword = async (data: IPassword) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(UPDATE_PASSWORD_ENDPOINT, data));
}
export const uploadProfileAvatar = async (data: IUserProfileAvatar) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(UPLOAD_PROFILE_AVATAR_ENDPOINT, data));
}
export const deleteAccount = async () => {
  return await handleResponse(axiosInstance.delete(DELETE_ACCOUNT_ENDPOINT));
}
// Follow-related API calls
export const getThreeUsersOnCard = async () => {
  return await handleResponse<PeopleResponse>(axiosInstance.get(GET_THREE_USERS_ENDPOINT));
}
export const getAllUsersToFollow = async (limit: number, page: number) => {
  return await getWithPagination(GET_ALL_USERS_TO_FOLLOW_ENDPOINT, limit, page);
}
export const getFollowingUsers = async (limit: number, page: number) => {
  return await getWithPagination(GET_FOLLOWING_USERS_ENDPOINT, limit, page);
}
export const getFollowersUsers = async (limit: number, page: number) => {
  return await getWithPagination(GET_FOLLOWERS_USERS_ENDPOINT, limit, page);
}
export const getFollowedUsersArticles = async (limit: number, page: number) => {
  return await getWithPagination(Get_FOLLOWING_USERS_ARTICLES_ENDPOINT, limit, page);
}
// Follow/unfollow actions
export const createFollowUser = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${FOLLOW_USERS_ENDPOINT}/${id}/follow`));
}
export const createOnFollowUser = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${ONFOLLOW_USERS_ENDPOINT}/${id}/unfollow`));
}