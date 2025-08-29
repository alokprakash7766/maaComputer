export class Admin {
  _id?: string;             // Optional, used when fetched from MongoDB
  name!: string;
  email!: string;
  password!: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
