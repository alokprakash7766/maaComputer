export interface Orders {
  id?: string;
  customerName: string;
  address: string;
  mobileNo: string;
  quantity: number;
  userImage?: string;
  card: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
  createdAt: any;
}
