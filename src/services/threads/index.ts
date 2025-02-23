import { axiosInstance } from '@api/axiosInstance'

import { handleResponse, getWithPagination } from '@utils/apiHelpers'
import { IThreadRequest, IThreadResponse, MessageResponse, Thread } from 'src/types'

export const createThread = async (data: IThreadRequest) => {
  return await handleResponse<MessageResponse>(axiosInstance.post('/threads/create', data));
}

export const editThread = async ({ data, id }: { data: IThreadRequest, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`/threads/edit/${id}`, data));
}

export const deleteThread = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/threads/delete/${id}`));
}

export const createThreadComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/threads/${id}/comments`, data));
}

export const editThreadComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`/threads/${id}/comments`, data));
}

export const deleteThreadComment = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/threads/comments/${id}`));
}

export const createThreadLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/threads/${id}/likes`));
}

export const createThreadDisLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/threads/${id}/dislikes`));
}

export const getSingleThread = async (id: string) => {
  return await handleResponse<Thread>(axiosInstance.get(`/threads/${id}`));
}

export const getThreads = async (limit: number) => {
  return await handleResponse<IThreadResponse>(axiosInstance.get(`/threads/all?limit=${limit}`));
}

export const getAllThreads = async (limit: number, page: number) => {
  return await getWithPagination('/threads/all/paginate', limit, page);
}