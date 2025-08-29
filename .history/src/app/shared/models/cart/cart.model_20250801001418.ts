export interface CartModel {
  id?: string; // Optional, added during fetch
  name: string;
  price: number;
  imageUrl: string; // Match your Firebase key
  quantity: number;
  addedAt: number;
}
