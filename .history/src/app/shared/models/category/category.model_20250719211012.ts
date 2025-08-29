export interface Category {
  id?: string;
  name: string;
  company: string;
  price: number;
  warranty: number;
  description: string;
  imageUrl?: string;  
  createdAt?: Date;
}
