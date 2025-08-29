import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storage = getStorage();

  constructor(private firestore: Firestore) {}

  // Place order
  async placeOrder(order: Orders) {
    const ordersRef = collection(this.firestore, 'orders');
    return await addDoc(ordersRef, order);
  }

  // Upload user image
  async uploadImage(file: File): Promise<string> {
    const filePath = `orders/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
