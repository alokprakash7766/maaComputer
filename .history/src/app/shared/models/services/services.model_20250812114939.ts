export class Services {
  id?: string;        // Firestore document ID
  name!: string;      // Service name
  description!: string; // Service details
  price!: number;     // Service price
  imageUrl?: string;  // Cloudinary uploaded image URL

  constructor(data?: Partial<Services>) {
    Object.assign(this, data);
  }
}
