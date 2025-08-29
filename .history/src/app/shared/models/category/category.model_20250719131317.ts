export interface Category {
  id?: string;
  name: string;
  company: string;
  price: number;
  warranty: number;
  description: string;
  uploadImageUrl?: string;
  createdAt?: Date;
}
