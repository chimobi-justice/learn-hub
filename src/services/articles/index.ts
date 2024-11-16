import { axiosInstance } from '@api/axiosInstance'
import {
  ARTICLE_DISLIKE_ENDPOINT,
  ARTICLE_LIKE_ENDPOINT,
  CREATE_ARTICLE_COMMENT_ENDPOINT,
  CREATE_ARTICLE_ENDPOINT,
  CREATE_SAVE_ARTICLE_ENDPOINT,
  DELETE_ARTICLE_COMMENT_ENDPOINT,
  DELETE_ARTICLE_ENDPOINT,
  DELETE_SAVE_ARTICLE_ENDPOINT,
  EDIT_ARTICLE_COMMENT_ENDPOINT,
  EDIT_ARTICLE_ENDPOINT,
  GET_ALL_ARTICLES_ENDPOINT,
  GET_PAGINATED_ARTICLES_ENDPOINT,
  GET_PINNED_ARTICLES_ENDPOINT,
  GET_RECOMMENDED_ARTICLES_ENDPOINT,
  GET_RELATED_AUTHOR_ARTICLES_ENDPOINT,
  GET_SAVED_ARTICLES_ENDPOINT,
  GET_SINGLE_ARTICLE_ENDPOINT
} from '@api/index'
import { handleResponse, getWithPagination } from '@utils/apiHelpers'
import { Article, IArticleRequest, IArticlesResponse, MessageResponse } from 'src/types'

export const createArticle = async (data: IArticleRequest) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(CREATE_ARTICLE_ENDPOINT, data));
}

export const editArticle = async ({ data, id }: { data: IArticleRequest, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`${EDIT_ARTICLE_ENDPOINT}/${id}`, data));
}

export const deleteArticle = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${DELETE_ARTICLE_ENDPOINT}/${id}`));
}

export const createArticleComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${CREATE_ARTICLE_COMMENT_ENDPOINT}/${id}/comments`, data));
}

export const editArticleComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`${EDIT_ARTICLE_COMMENT_ENDPOINT}/${id}/comments`, data));
}

export const deleteArticleComment = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${DELETE_ARTICLE_COMMENT_ENDPOINT}/comments/${id}`));
}

export const createArticleLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${ARTICLE_LIKE_ENDPOINT}/${id}/likes`));
}

export const createArticleDisLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${ARTICLE_DISLIKE_ENDPOINT}/${id}/dislikes`));
}

export const createSaveArticle = async (article_id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`${CREATE_SAVE_ARTICLE_ENDPOINT}/${article_id}`));
}

export const deleteSaveArticle = async (article_id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`${DELETE_SAVE_ARTICLE_ENDPOINT}/${article_id}`));
}

export const getSingleArticle = async (id: string) => {
  return await handleResponse<Article>(axiosInstance.get(`${GET_SINGLE_ARTICLE_ENDPOINT}/${id}`));
}

export const getPinnedArticles = async () => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get(GET_PINNED_ARTICLES_ENDPOINT));
}

export const getRecommentedArticles = async (limit: number, page: number) => {
  return await getWithPagination(GET_RECOMMENDED_ARTICLES_ENDPOINT, limit, page);
}

export const getSavedArticles = async (limit: number, page: number) => {
  return await getWithPagination(GET_SAVED_ARTICLES_ENDPOINT, limit, page);
}

export const getRelatedArticlesArticles = async (id: string) => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get(`${GET_RELATED_AUTHOR_ARTICLES_ENDPOINT}/${id}/arthored-related-articles`));
}

export const getArticles = async (limit: number) => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get(`${GET_ALL_ARTICLES_ENDPOINT}?limit=${limit}`));
}

export const getAllArticles = async (limit: number, page: number) => {
  return await getWithPagination(GET_PAGINATED_ARTICLES_ENDPOINT, limit, page);
}