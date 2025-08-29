export interface Orders {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  mobileNo: string;         // ✅ Added field
  orderDate: Date;
  status: string;
}
