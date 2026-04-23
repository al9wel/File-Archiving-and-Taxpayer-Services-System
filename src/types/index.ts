import type { User } from "./User";


export interface LoginParams {
  userName?: string;
  password?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    must_change_password?: boolean;
    user: User | null;
  };
}
