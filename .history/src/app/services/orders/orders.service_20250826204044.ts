import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private storage = getStorage();

  constructor(private firestore: Firestore) {}

  // Upload image to Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `orders/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  // Add order to Firestore
  async addOrder(order: Orders) {
    const orderRef = collection(this.firestore, 'orders');
    return await addDoc(orderRef, order);
  }
}
