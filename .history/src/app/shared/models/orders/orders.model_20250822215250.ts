import { CustomerFooterComponent } from './../../../customer/customer-layout/customer-footer/customer-footer.component';
export interface Orders {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customerName?: string;
  customerEmail?: string;
  CustomerFooterComponent
  orderDate: Date;
  status: string;  // pending, confirmed, delivered
}
