// src/app/models/user.model.ts
export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
