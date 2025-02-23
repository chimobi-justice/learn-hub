import { axiosInstance } from '@api/axiosInstance'

export const fetchSearchResults = async ({ query, page, resource }: any) => {
  const response = await axiosInstance.get('/search', {
    params: { search: query, page, resource }
  });

  const dataResponse = await response.data;
  return { ...dataResponse, prevOffset: page };
}