import type { TypeUser } from "./user.types";

export interface LoginResponse {
  access_token: string;
  user:         TypeUser;
}