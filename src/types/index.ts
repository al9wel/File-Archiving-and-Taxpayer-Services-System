import type { User } from "./User";
export * from "./User";
export * from "./Department";
export * from "./ActivityType";
export * from "./Region";
export * from "./District";
export * from "./PaymentType";
export * from "./EmploymentType";
export * from "./TaxCollector";

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
