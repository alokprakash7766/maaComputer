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
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';  // Import Firebase Storage
import { Observable } from 'rxjs';
import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';

@Injectable({
  providedIn: 'root'
})
export class WeddingCardService {
  private dbPath = 'weddingCards';
  private weddingCardRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore, private storage: Storage) {
    this.weddingCardRef = collection(this.db, this.dbPath);
  }

  addWeddingCard(card: WeddingCard): Promise<any> {
    return addDoc(this.weddingCardRef, card);
  }

  getAllWeddingCards(): Observable<WeddingCard[]> {
    return collectionData(this.weddingCardRef, { idField: 'id' }) as Observable<WeddingCard[]>;
  }

  getSingleWeddingCard(id: string): Promise<WeddingCard> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) throw new Error("Wedding Card not found");
      return { ...(snapshot.data() as WeddingCard), id: snapshot.id };
    });
  }

  updateWeddingCard(id: string, data: Partial<WeddingCard>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  deleteWeddingCard(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }

  // New method for uploading image to Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `weddingCards/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get downloadable URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}
