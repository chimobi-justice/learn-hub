export interface AuthFields {
  email: string;
  password: string;
}

export interface ISignup extends AuthFields {
  fullname: string;
}

export interface ISignin extends AuthFields {}

export interface SigninResponse {
  message: string;
  access_token: string;
}
