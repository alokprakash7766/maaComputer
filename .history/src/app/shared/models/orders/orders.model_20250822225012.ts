export interface Order {
  id?: string;          // firebase doc id
  productId: string;    // wedding card id
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  mobileNo: string;
  userEmail: string;
  userName: string;
  orderDate: string;
}
