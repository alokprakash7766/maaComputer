export class User {
  _id?: string;         // Optional: MongoDB/Firebase ID
  name!: string;
  email!: string;
  password!: string;
  phone?: string;
  address?: string;
  role?: string;        // Example: "customer", "admin"
  createdAt?: Date;
  updatedAt?: Date;
}
a