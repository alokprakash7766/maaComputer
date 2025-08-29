export interface Billing {
  id?: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  billingDate: any;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}
