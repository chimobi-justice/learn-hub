import { axiosInstance } from '@api/axiosInstance'
import {
  CREATE_THREAD_ENDPOINT,
  DELETE_THREAD_ENDPOINT,
  EDIT_THREAD_ENDPOINT,
  GET_ALL_THREADS_ENDPOINT,
  GET_SINGLE_THREAD_ENDPOINT,
  CREATE_THREAD_COMMENT_ENDPOINT,
  THREAD_DISLIKE_ENDPOINT,
  THREAD_LIKE_ENDPOINT,
} from '@api/index'
import { IThread } from 'src/types'

export const createThread = async (data: IThread) => {
  const response = await axiosInstance.post(CREATE_THREAD_ENDPOINT, data);
  return response.data;
}

export const editThread = async ({ data, id }: { data: IThread, id: string }) => {
  const response = await axiosInstance.patch(`${EDIT_THREAD_ENDPOINT}/${id}`, data);
  return response.data;
}

export const getAllThreads = async (limit: number) => {
  const response = await axiosInstance.get(`${GET_ALL_THREADS_ENDPOINT}?limit=${limit}`);
  return response.data.data;
}

export const getSingleThread = async (id: string) => {
  const response = await axiosInstance.get(`${GET_SINGLE_THREAD_ENDPOINT}/${id}`);
  return response.data;
}

export const deleteThread = async (id: string) => {
  const response = await axiosInstance.delete(`${DELETE_THREAD_ENDPOINT}/${id}`);
  return response.data;
}

export const createThreadComment = async ({ data, id }: { data: any, id: string }) => {
  const response = await axiosInstance.post(`${CREATE_THREAD_COMMENT_ENDPOINT}/${id}/comments`, data);
  return response.data;
}

export const createThreadLike = async ({id}: {id: string}) => {
  const response = await axiosInstance.post(`${THREAD_LIKE_ENDPOINT}/${id}/likes`);
  return response.data;
}

export const createThreadDisLike = async ({id}: {id: string}) => {
  const response = await axiosInstance.delete(`${THREAD_DISLIKE_ENDPOINT}/${id}/dislikes`);
  return response.data;
}
