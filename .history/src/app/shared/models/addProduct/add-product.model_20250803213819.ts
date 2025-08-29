export interface Product {
  categoryId: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  createdAt?: any;
  status?: boolean;
}
