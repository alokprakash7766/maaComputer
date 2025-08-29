export interface Orders {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName?: string;
  customerEmail?: string;
  cus
  orderDate: Date;
  status: string;  // pending, confirmed, delivered
}
