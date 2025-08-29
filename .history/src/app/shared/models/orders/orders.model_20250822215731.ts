export interface Orders {
  id?: string;         // Auto generated Firestore ID
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName: string;
  customerAddress: string;
  mobileNo: string;     // ✅ new field for mobile number
  orderDate: Date;
  status: string;       // pending, confirmed etc.
}
