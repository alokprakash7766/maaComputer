export interface CartItem {
  id?: string;
  productId: string;
  img
  name: string;
  price: number;
  quantity: number;
  createdAt?: number;
}