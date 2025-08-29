export interface Billing {
  customerName: string;
  address: string;
  phone: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  tax?: number;
  grandTotal: number;
  createdAt: Date;
}
