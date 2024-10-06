import { API_BASE_URL } from '@api/constant'

export const USER_ENDPOINT = `${API_BASE_URL}/users/me`;

export const UPDATE_PROFILE_ENDPOINT = `${API_BASE_URL}/users/accounts/update-profile`;

export const UPLOAD_PROFILE_AVATAR_ENDPOINT = `${API_BASE_URL}/users/accounts/upload-avatar`;

export const UPDATE_PASSWORD_ENDPOINT = `${API_BASE_URL}/users/accounts/update-password`;

export const DELETE_ACCOUNT_ENDPOINT = `${API_BASE_URL}/users/accounts/delete`;

export const PUBLIC_USER_ENDPOINT = `${API_BASE_URL}/users`;

export const GET_THREE_USERS_ENDPOINT = `${API_BASE_URL}/users/get-three-users`;

export const GET_ALL_USERS_ENDPOINT = `${API_BASE_URL}/users/all-users`;

export const Get_FOLLOWING_USERS_ARTICLES_ENDPOINT = `${API_BASE_URL}/users/my-follow-users/articles`;

export const FOLLOW_USERS_ENDPOINT = `${API_BASE_URL}/users`;

export const ONFOLLOW_USERS_ENDPOINT = `${API_BASE_URL}/users`;
