import { axiosInstance } from '@api/axiosInstance'
import { SEARCH_ENDPOINT } from '@api/endpoints/searchEndpoints'

export const getSearch = async (search: string) => {
  const response = await axiosInstance.get(`${SEARCH_ENDPOINT}?search=${search}`);
  return response.data.data;
}