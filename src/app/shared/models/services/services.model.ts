export class Services {
  id?: string;         // Firestore document ID
  name!: string;       // Service name
  description!: string; // Service description
  price!: number;      // Service price
  imageUrl?: string;   // Uploaded image URL

  constructor(data?: Partial<Services>) {
    Object.assign(this, data);
  }
}
