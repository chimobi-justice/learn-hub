import { axiosInstance } from '@api/axiosInstance'
import { USER_ENDPOINT, UserResponse } from '@api/index'

export const getUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get(USER_ENDPOINT);
  return response.data;
}