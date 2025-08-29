export interface Orders {
  id?: string;
  customerName: string;
  email: string;
  mobile: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  createdAt: any;   // ✅ Firestore Timestamp or Date दोनों को allow करेगा
}
