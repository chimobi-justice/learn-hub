import { API_BASE_URL } from '@api/constant'

export const CREATE_THREAD_ENDPOINT = `${API_BASE_URL}/threads/create`;

export const EDIT_THREAD_ENDPOINT = `${API_BASE_URL}/threads/edit`;

export const DELETE_THREAD_ENDPOINT = `${API_BASE_URL}/threads/delete`;

export const GET_ALL_THREADS_ENDPOINT = `${API_BASE_URL}/threads/all`;

export const GET_PAGINATED_THREADS_ENDPOINT = `${API_BASE_URL}/threads/all/paginate`;

export const GET_SINGLE_THREAD_ENDPOINT = `${API_BASE_URL}/threads`;

export const GET_ARTHORED_THREADS_ENDPOINT = `${API_BASE_URL}/threads/authored`;

export const CREATE_THREAD_COMMENT_ENDPOINT = `${API_BASE_URL}/threads`;

export const DELETE_THREAD_COMMENT_ENDPOINT = `${API_BASE_URL}/threads`;

export const THREAD_LIKE_ENDPOINT = `${API_BASE_URL}/threads`;

export const THREAD_DISLIKE_ENDPOINT = `${API_BASE_URL}/threads`;