// src/app/models/user.model.ts

export interface User {
  id?: string;
  uid?: string;
  name?: string;
  phone?: number;
  email?: string;
  password?: string;
  userType?: number;         // 1 = Admin, 2 = Vendor, 3 = Customer
  address?: string;
  status?: boolean;          // true = active, false = disabled
  createdAt?: Date;          // Timestamp when user is registered
}
