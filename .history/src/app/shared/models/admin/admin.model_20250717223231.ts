export class Admin {
  _id?: string;             // Optional, used when fetched from MongoDB
  name!: string;
  email!: string;
  password!: string;
  role?: string;            // Optional: "superadmin", "editor", etc.
  createdAt?: Date;
  updatedAt?: Date;
}
