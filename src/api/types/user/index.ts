export interface UserResponse {
  id: string | number;
  fullname: string;
  email: string;
  username: string;
  twitter: string;
  avatar: string;
  gitHub: string;
  website: string;
  headlines: string;
  state: string;
  country: string;
  bio: string;
}

export interface UpdateProfileRequest {
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  twitter: string;
  gitHub: string;
  website: string;
  profile_headlines: string;
  state: string;
  country: string;
  bio: string;
}

export interface UpdateProfileResponse {
  message: string;
}

export interface UpdateProfileAvatarRequest {
  avatar: string;
}

export interface UpdateProfileAvatarResponse {
  message: string;
}

export interface UpdatePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdatePasswordResponse {
  message: string;
}
