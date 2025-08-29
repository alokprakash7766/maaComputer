export interface CartItem {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: number;
}