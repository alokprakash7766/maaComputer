export interface Orders {
  id?: string;
  customerName: string;
  email: string;
  mobile: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount?: number;   // 💰 kitna payment hua
  paymentId?: string;     // 🆔 Razorpay se aaya hua id
  imageUrl?: string;
  createdAt: any;
}
