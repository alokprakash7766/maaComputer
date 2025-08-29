// src/app/models/orders.model.ts
export class Orders {
  id?: string;
  title!: string;
  description!: string;
  price!: number;
  imageUrl!: string;   // image का URL (Firebase/Cloudinary/local)
}
