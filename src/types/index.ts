export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string | null;
  idCard?: string;
  userName?: string;
  phone?: string;
  image?: string;
  role: string;
  mustChangePassword?: boolean;
}

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
    user: User;
  };
}
