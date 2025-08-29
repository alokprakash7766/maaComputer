export interface Product {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;  // ✅ Add this
}
