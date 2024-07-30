export interface SignupRequest {
  fullname: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  message: string;
  access_token: string;
}