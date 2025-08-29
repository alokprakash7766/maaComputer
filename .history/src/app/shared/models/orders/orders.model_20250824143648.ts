export interface Orders {
  id?: string;          // Firebase Document ID
  customerName: string;
  email: string;
  mobile: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;    // optional: product image
  createdAt: Date;
}
