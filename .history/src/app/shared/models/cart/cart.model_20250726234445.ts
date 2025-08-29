export interface CartItem {
  id?: string;
  productId: string;
  imageUrl
  name: string;
  price: number;
  quantity: number;
  createdAt?: number;
}