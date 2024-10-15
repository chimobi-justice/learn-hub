import { axiosInstance } from '@api/axiosInstance'
import {
  ARTICLE_DISLIKE_ENDPOINT,
  ARTICLE_LIKE_ENDPOINT,
  CREATE_ARTICLE_COMMENT_ENDPOINT,
  CREATE_ARTICLE_ENDPOINT,
  CREATE_SAVE_ARTICLE_ENDPOINT,
  DELETE_ARTICLE_ENDPOINT,
  DELETE_SAVE_ARTICLE_ENDPOINT,
  EDIT_ARTICLE_ENDPOINT,
  GET_ALL_ARTICLES_ENDPOINT,
  GET_PINNED_ARTICLES_ENDPOINT,
  GET_RECOMMENDED_ARTICLES_ENDPOINT,
  GET_RELATED_AUTHOR_ARTICLES_ENDPOINT,
  GET_SAVED_ARTICLES_ENDPOINT,
  GET_SINGLE_ARTICLE_ENDPOINT
} from '@api/index'
import { IArticle } from 'src/types'

export const createArticle = async (data: IArticle) => {
  const response = await axiosInstance.post(CREATE_ARTICLE_ENDPOINT, data);
  return response.data;
}

export const editArticle = async ({ data, id }: { data: IArticle, id: any }) => {
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

export const createArticleLike = async ({ id }: { id: string }) => {
  const response = await axiosInstance.post(`${ARTICLE_LIKE_ENDPOINT}/${id}/likes`);
  return response.data;
}

export const createArticleDisLike = async ({ id }: { id: string }) => {
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

export const createSaveArticle = async (article_id: string) => {
  const response = await axiosInstance.post(`${CREATE_SAVE_ARTICLE_ENDPOINT}/${article_id}`);
  return response.data;
};

export const deleteSaveArticle = async (article_id: string) => {
  const response = await axiosInstance.delete(`${DELETE_SAVE_ARTICLE_ENDPOINT}/${article_id}`);
  return response.data;
}

export const getSavedArticles = async () => {
  const response = await axiosInstance.get(GET_SAVED_ARTICLES_ENDPOINT);
  return response.data.data;
}

export const getRelatedArticlesArticles = async (id: string) => {
  const response = await axiosInstance.get(`${GET_RELATED_AUTHOR_ARTICLES_ENDPOINT}/${id}/arthored-related-articles`);
  return response.data.data;
}
