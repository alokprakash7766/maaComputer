// import { inject, Injectable } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   collectionData,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDoc,
//   updateDoc,
//   CollectionReference,
//   DocumentData
// } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeddingCardService {
//   private dbPath = 'weddingCards';
//   private firestore: Firestore = inject(Firestore);
//   private weddingCardRef: CollectionReference<DocumentData>;

//   constructor(private db: Firestore) {
//     this.weddingCardRef = collection(this.db, this.dbPath);
//   }

//   addWeddingCard(card: WeddingCard): Promise<any> {
//     return addDoc(this.weddingCardRef, card);
//   }

//   getAllWeddingCards(): Observable<WeddingCard[]> {
//     return collectionData(this.weddingCardRef, { idField: 'id' }) as Observable<WeddingCard[]>;
//   }
  
//   getSingleWeddingCard(id: string): Promise<WeddingCard> {
//     const docRef = doc(this.db, `${this.dbPath}/${id}`);
//     return getDoc(docRef).then(snapshot => {
//       if (!snapshot.exists()) throw new Error("Wedding Card not found");
//       return { ...(snapshot.data() as WeddingCard), id: snapshot.id };
//     });
//   }

//   updateWeddingCard(id: string, data: Partial<WeddingCard>): Promise<void> {
//     const docRef = doc(this.db, `${this.dbPath}/${id}`);
//     return updateDoc(docRef, data);
//   }

//   deleteWeddingCard(id: string): Promise<void> {
//     const docRef = doc(this.db, `${this.dbPath}/${id}`);
//     return deleteDoc(docRef);
//   }
// }


import { Injectable, inject } from '@angular/core';
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
import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';

@Injectable({
  providedIn: 'root'
})
export class WeddingCardService {
  private dbPath = 'weddingCards';
  private firestore: Firestore = inject(Firestore);   // ✅ sirf yaha inject
  private weddingCardRef: CollectionReference<DocumentData>;

  constructor() {
    this.weddingCardRef = collection(this.firestore, this.dbPath);
  }

  addWeddingCard(card: WeddingCard): Promise<any> {
    return addDoc(this.weddingCardRef, card);
  }

  getAllWeddingCards(): Observable<WeddingCard[]> {
    return collectionData(this.weddingCardRef, { idField: 'id' }) as Observable<WeddingCard[]>;
  }

  async getSingleWeddingCard(id: string): Promise<WeddingCard> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw new Error("Wedding Card not found");
    return { ...(snapshot.data() as WeddingCard), id: snapshot.id };
  }

  updateWeddingCard(id: string, data: Partial<WeddingCard>): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  deleteWeddingCard(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
