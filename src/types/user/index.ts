export interface IUserProps {
  id: string;
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
  followers?: number;
  followings?: number;
  is_following?: boolean;
}

export interface IUser {
  data: IUserProps
}

export interface IUserProfile extends Omit<IUserProps, 'id'>  {}

export interface IUserProfileAvatar {
  avatar: string;
}

export interface IPassword {
  current_password: string;
  password: string;
  password_confirmation: string;
}
