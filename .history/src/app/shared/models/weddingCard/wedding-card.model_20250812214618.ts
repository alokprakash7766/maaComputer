export interface WeddingCard {
  id?: string;           // Firestore document ID (optional)
  name: string;          // Card name
  description: string;   // Card description
  price: number;         // Price
  imageUrl: string;      // Cloudinary image URL
  createdAt: any;        // Firestore timestamp
}
