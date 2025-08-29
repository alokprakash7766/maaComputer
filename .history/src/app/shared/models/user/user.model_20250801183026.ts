// src/app/models/user.model.ts

export interface User {
  id?: string;
  uid?: string;
  name?: string;
  phone?: number;
  email?: string;
  password?: string;
  userType?: number;
  address?: string;
  status?: boolean;
  createdAt?: Date;
}
