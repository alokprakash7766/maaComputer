export interface Orders {
  id?: string;
  customerName: string;
  email: string;
  mobile: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;   // ✅ Cloudinary URL store hoga
  createdAt: any;
}
