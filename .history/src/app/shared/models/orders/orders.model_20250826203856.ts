export interface Orders {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
  paymentId?: string;
  createdAt: string;
}
