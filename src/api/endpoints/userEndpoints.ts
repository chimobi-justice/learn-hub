import { API_BASE_URL } from '@api/constant'

export const USER_ENDPOINT = `${API_BASE_URL}/users/me`;

export const UPDATE_PROFILE_ENDPOINT = `${API_BASE_URL}/users/accounts/update-profile`;

export const UPLOAD_PROFILE_AVATAR_ENDPOINT = `${API_BASE_URL}/users/accounts/upload-avatar`;

export const UPDATE_PASSWORD_ENDPOINT = `${API_BASE_URL}/users/accounts/update-password`;

export const DELETE_ACCOUNT_ENDPOINT = `${API_BASE_URL}/users/accounts/delete`;
