export interface DietAgency {
  city: string;
  name: string;
  _id: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

export interface SignupResponse {
  msg: string;
  userId: string;
}