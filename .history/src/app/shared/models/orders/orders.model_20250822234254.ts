export interface Orders {
  id?: string;            // Firestore auto ID (optional)
  customerName: string;   // user name
  address: string;        // user address
  mobileNo: string;       // user mobile
  quantity: number;       // order quantity
  userImage?: string;     // uploaded user image url
  card: {
    name: string;
    description: string;
    price: number;
    image: string;        // card image url
  };
  createdAt: any;         // timestamp
}
