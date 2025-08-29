// orders.model.ts
export class Orders {
  id?: string;          // firebase id ke liye
  productId!: string;   // wedding card id
  quantity!: number;    
  totalPrice!: number;
  customerName?: string;
  customerAddress?: string;
  createdAt?: Date;
}
