export interface Orders {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName?: string;
  customerEmail?: string;
  M
  orderDate: Date;
  status: string;  // pending, confirmed, delivered
}
