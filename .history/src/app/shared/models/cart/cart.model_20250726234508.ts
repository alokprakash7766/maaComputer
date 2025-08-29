export interface CartItem {
  id?: string;
  productId: string;
  imageUrl?: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: number;
}