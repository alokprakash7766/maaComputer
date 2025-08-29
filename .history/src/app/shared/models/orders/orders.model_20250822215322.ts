export interface Orders {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName?: string;
  customerEmail?: string;
  customerNumber?:number;
  orderDate: Date;
  status: string;
}
