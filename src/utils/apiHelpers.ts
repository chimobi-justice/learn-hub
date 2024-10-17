import { axiosInstance } from '@api/axiosInstance'

export const handleResponse = async <T>(response: Promise<{ data: T }>): Promise<T> => {
  const res = await response;
  return res.data;
};

export const getWithPagination = async (url: string, limit: number, page: number) => {
  const response = await axiosInstance.get(`${url}?limit=${limit}&page=${page}`);
  const dataResponse = await response.data;
  return {...dataResponse, prevOffset: page}
}