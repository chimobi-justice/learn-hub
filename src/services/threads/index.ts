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
  GET_PAGINATED_THREADS_ENDPOINT,
} from '@api/index'
import { handleResponse, getWithPagination } from '@utils/apiHelpers'
import { IThreadRequest, IThreadResponse, MessageResponse, Thread } from 'src/types'

export const createThread = async (data: IThreadRequest) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(CREATE_THREAD_ENDPOINT, data));
}

export const editThread = async ({ data, id }: { data: IThreadRequest, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`${EDIT_THREAD_ENDPOINT}/${id}`, data));
}

export const deleteThread = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${DELETE_THREAD_ENDPOINT}/${id}`));
}

export const createThreadComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${CREATE_THREAD_COMMENT_ENDPOINT}/${id}/comments`, data));
}

export const createThreadLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${THREAD_LIKE_ENDPOINT}/${id}/likes`));
}

export const createThreadDisLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${THREAD_DISLIKE_ENDPOINT}/${id}/dislikes`));
}

export const getSingleThread = async (id: string) => {
  return await handleResponse<Thread>(axiosInstance.get(`${GET_SINGLE_THREAD_ENDPOINT}/${id}`));
}

export const getThreads = async (limit: number) => {
  return await handleResponse<IThreadResponse>(axiosInstance.get(`${GET_ALL_THREADS_ENDPOINT}?limit=${limit}`));
}

export const getAllThreads = async (limit: number, page: number) => {
  return await getWithPagination(GET_PAGINATED_THREADS_ENDPOINT, limit, page);
}