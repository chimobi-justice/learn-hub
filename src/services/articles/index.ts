import { axiosInstance } from '@api/axiosInstance'

import { handleResponse, getWithPagination } from '@utils/apiHelpers'
import { Article, IArticleRequest, IArticlesResponse, MessageResponse } from 'src/types'

export const createArticle = async (data: IArticleRequest) => {
  return await handleResponse<MessageResponse>(axiosInstance.post('/articles/create', data));
}

export const editArticle = async ({ data, id }: { data: IArticleRequest, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`/articles/edit/${id}`, data));
}

export const deleteArticle = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/articles/delete/${id}`));
}

export const createArticleComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/articles/${id}/comments`, data));
}

export const editArticleComment = async ({ data, id }: { data: any, id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.patch(`/articles/${id}/comments`, data));
}

export const deleteArticleComment = async (id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/articles/comments/${id}`));
}

export const createArticleLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/articles/${id}/likes`));
}

export const createArticleDisLike = async ({ id }: { id: string }) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/articles/${id}/dislikes`));
}

export const createSaveArticle = async (article_id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.post(`/articles/save-article/${article_id}`));
}

export const deleteSaveArticle = async (article_id: string) => {
  return await handleResponse<MessageResponse>(axiosInstance.delete(`/articles/unsave-article/${article_id}`));
}

export const getSingleArticle = async (id: string) => {
  return await handleResponse<Article>(axiosInstance.get(`/articles/${id}`));
}

export const getPinnedArticles = async () => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get('/articles/pinned-articles'));
}

export const getRecommentedArticles = async (limit: number, page: number) => {
  return await getWithPagination('/articles/recommented-articles', limit, page);
}

export const getSavedArticles = async (limit: number, page: number) => {
  return await getWithPagination('/articles/saved-articles', limit, page);
}

export const getRelatedArticlesArticles = async (id: string) => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get(`/articles/${id}/arthored-related-articles`));
}

export const getArticles = async (limit: number) => {
  return await handleResponse<IArticlesResponse>(axiosInstance.get(`/articles/all?limit=${limit}`));
}

export const getAllArticles = async (limit: number, page: number) => {
  return await getWithPagination('/articles/all/paginate', limit, page);
}