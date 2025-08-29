import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';

@Injectable({
  providedIn: 'root'
})
export class WeddingCardService {
  private dbPath = 'weddingCards';
  private weddingCardRef: CollectionReference<DocumentData>;

  // 🔥 Firestore inject via constructor
  constructor(private db: Firestore) {
    this.weddingCardRef = collection(this.db, this.dbPath);
  }

  
  addWeddingCard(card: WeddingCard): Promise<void> {
    if (!card.id) {
      throw new Error("Card must have an 'id' property to save with same id");
    }
    const docRef = doc(this.db, `${this.dbPath}/${card.id}`);
    return setDoc(docRef, card);
  }

  // ✅ Get all cards (Realtime Observable)
  getAllWeddingCards(): Observable<WeddingCard[]> {
    return collectionData(this.weddingCardRef, { idField: 'id' }) as Observable<WeddingCard[]>;
  }

  // ✅ Get single card by id
  getSingleWeddingCard(id: string): Promise<WeddingCard> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) throw new Error("Wedding Card not found");
      return { ...(snapshot.data() as WeddingCard), id: snapshot.id };
    });
  }

  // ✅ Update existing card
  updateWeddingCard(id: string, data: Partial<WeddingCard>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  // ✅ Delete card
  deleteWeddingCard(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
