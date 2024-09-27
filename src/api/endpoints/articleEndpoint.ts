import { API_BASE_URL } from '@api/constant'

export const CREATE_ARTICLE_ENDPOINT = `${API_BASE_URL}/articles/create`;

export const EDIT_ARTICLE_ENDPOINT = `${API_BASE_URL}/articles/edit`;

export const DELETE_ARTICLE_ENDPOINT = `${API_BASE_URL}/articles/delete`;

export const GET_ALL_ARTICLES_ENDPOINT = `${API_BASE_URL}/articles/all`;

export const GET_PAGINATED_ARTICLES_ENDPOINT = `${API_BASE_URL}/articles/all/paginate`;

export const GET_SINGLE_ARTICLE_ENDPOINT = `${API_BASE_URL}/articles`;

export const GET_ARTHORED_ARTICLES_ENDPOINT = `${API_BASE_URL}/articles/authored`;

export const CREATE_ARTICLE_COMMENT_ENDPOINT = `${API_BASE_URL}/articles`;

export const ARTICLE_LIKE_ENDPOINT = `${API_BASE_URL}/articles`;

export const ARTICLE_DISLIKE_ENDPOINT = `${API_BASE_URL}/articles`;

export const GET_RECOMMENDED_ARTICLES_ENDPOINT = `${API_BASE_URL}/articles/recommented-articles`;

export const GET_PINNED_ARTICLES_ENDPOINT = `${API_BASE_URL}/articles/pinned-articles`;