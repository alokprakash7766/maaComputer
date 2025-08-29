export interface Billing {
  id?: string;               // optional, Firestore doc id
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  billingDate: Date;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
