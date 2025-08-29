// src/app/shared/models/order/order.model.ts
export interface OrderModel {
  id?: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  orderDate: Date;
  status: string;   // e.g. "Pending", "Confirmed"
}
