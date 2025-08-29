import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface WeddingCard {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingCardService {
  private dbPath = 'weddingCards';
  private weddingCardRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.weddingCardRef = collection(this.db, this.dbPath);
  }

  // ✅ Add new wedding card
  addWeddingCard(card: WeddingCard): Promise<any> {
    return addDoc(this.weddingCardRef, card);
  }

  // ✅ Get all wedding cards
  getAllWeddingCards(): Observable<WeddingCard[]> {
    return collectionData(this.weddingCardRef, { idField: 'id' }) as Observable<WeddingCard[]>;
  }

  // ✅ Get single wedding card by ID
  getSingleWeddingCard(id: string): Promise<WeddingCard> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) throw new Error("Wedding Card not found");
      return { ...(snapshot.data() as WeddingCard), id: snapshot.id };
    });
  }

  // ✅ Update wedding card by ID
  updateWeddingCard(id: string, data: Partial<WeddingCard>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  // ✅ Delete wedding card by ID
  deleteWeddingCard(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
