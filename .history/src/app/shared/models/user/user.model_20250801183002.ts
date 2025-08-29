// src/app/models/user.model.ts

export interface User {
  id?: string;
  uid?: string;              // Firebase Auth UID (if using auth)
  name?: string;
  phone?: number;            // 10-digit mobile number
  email?: string;
  password?: string;         // Store hashed if possible
  userType?: number;         // 1 = Admin, 2 = Vendor, 3 = Customer
  address?: string;
  status?: boolean;          // true = active, false = disabled
  createdAt?: Date;          // Timestamp when user is registered
}
