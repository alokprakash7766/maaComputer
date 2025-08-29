export interface Orders {
  id?: string;
  customerName: string;
  address: string;
  mobileNo: string;
  quantity: number;
  userImage?: string; // uploaded user image
  card: {
    name: string;
    description: string;
    price: number;
    imageUrl: string; // card image (from product listing)
  };
  createdAt: number;
}
