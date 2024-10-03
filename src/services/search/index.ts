import { axiosInstance } from '@api/axiosInstance'
import { SEARCH_ENDPOINT } from '@api/endpoints/searchEndpoints'

export const fetchSearchResults = async ({ query, page, resource }: any) => {
  const response = await axiosInstance.get(`${SEARCH_ENDPOINT}`, {
    params: { search: query, page, resource }
  });

  const dataResponse = await response.data;
  return { ...dataResponse, prevOffset: page };
}