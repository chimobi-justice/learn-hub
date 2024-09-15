import { axiosInstance } from '@api/axiosInstance'
import {
  ArticleRequest,
  CREATE_ARTICLE_ENDPOINT,
  DELETE_ARTICLE_ENDPOINT,
  EDIT_ARTICLE_ENDPOINT,
  GET_ALL_ARTICLES_ENDPOINT,
  GET_ARTHORED_ARTICLE_ENDPOINT,
  GET_SINGLE_ARTICLE_ENDPOINT
} from '@api/index'

export const createArticle = async (data: ArticleRequest) => {
  const response = await axiosInstance.post(CREATE_ARTICLE_ENDPOINT, data);
  return response.data;
}

export const editArticle = async ({ data, id }: { data: ArticleRequest, id: any }) => {
  const response = await axiosInstance.patch(`${EDIT_ARTICLE_ENDPOINT}/${id}`, data);
  return response.data;
}

export const getAllArticles = async (limit: number) => {
  const response = await axiosInstance.get(`${GET_ALL_ARTICLES_ENDPOINT}?limit=${limit}`);
  return response.data.data;
}

export const getAuthoredArticles = async (limit: number) => {
  const response = await axiosInstance.get(`${GET_ARTHORED_ARTICLE_ENDPOINT}?limit=${limit}`);
  return response.data.data;
}

export const getSingleArticle = async (id: any) => {
  const response = await axiosInstance.get(`${GET_SINGLE_ARTICLE_ENDPOINT}/${id}`);
  return response.data;
}

export const deleteArticle = async (id: any) => {
  const response = await axiosInstance.delete(`${DELETE_ARTICLE_ENDPOINT}/${id}`);
  return response.data;
}
