// src/app/models/category.model.ts

export interface Category {
  id?: string; // optional - Firebase ya MongoDB ke liye
  name: string;
  company: string;
  price: number;
  warranty: number;
  description: string;
  imageUrl?: string;
  createdAt?: Date; // optional timestamp
}
