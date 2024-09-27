import { axiosInstance } from '@api/axiosInstance'
import {
  ARTICLE_DISLIKE_ENDPOINT,
  ARTICLE_LIKE_ENDPOINT,
  ArticleRequest,
  CREATE_ARTICLE_COMMENT_ENDPOINT,
  CREATE_ARTICLE_ENDPOINT,
  DELETE_ARTICLE_ENDPOINT,
  EDIT_ARTICLE_ENDPOINT,
  GET_ALL_ARTICLES_ENDPOINT,
  GET_PINNED_ARTICLES_ENDPOINT,
  GET_RECOMMENDED_ARTICLES_ENDPOINT,
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

export const getSingleArticle = async (id: string) => {
  const response = await axiosInstance.get(`${GET_SINGLE_ARTICLE_ENDPOINT}/${id}`);
  return response.data;
}

export const deleteArticle = async (id: string) => {
  const response = await axiosInstance.delete(`${DELETE_ARTICLE_ENDPOINT}/${id}`);
  return response.data;
}

export const createArticleComment = async ({ data, id }: { data: any, id: any }) => {
  const response = await axiosInstance.post(`${CREATE_ARTICLE_COMMENT_ENDPOINT}/${id}/comments`, data);
  return response.data;
}

export const createArticleLike = async ({id}: {id: string}) => {
  const response = await axiosInstance.post(`${ARTICLE_LIKE_ENDPOINT}/${id}/likes`);
  return response.data;
}

export const createArticleDisLike = async ({id}: {id: string}) => {
  const response = await axiosInstance.delete(`${ARTICLE_DISLIKE_ENDPOINT}/${id}/dislikes`);
  return response.data;
}

export const getRecommentedArticles = async (limit: number) => {
  const response = await axiosInstance.get(`${GET_RECOMMENDED_ARTICLES_ENDPOINT}?limit=${limit}`);
  return response.data.data;
}

export const getPinnedArticles = async () => {
  const response = await axiosInstance.get(GET_PINNED_ARTICLES_ENDPOINT);
  return response.data.data;
}
