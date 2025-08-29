import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';

import { Observable, map } from 'rxjs';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: Firestore, private storage: Storage) {}

  // 🔼 Upload Image to Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `orders/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);   // ✅ return image url
  }

  // ➕ Add Order
  addOrder(order: Orders) {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, {
      ...order,
      createdAt: new Date()
    });
  }

  // 📥 Get All Orders
  getOrders(): Observable<Orders[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }).pipe(
      map((orders: any[]) =>
        orders.map(order => ({
          ...order,
          createdAt: order.createdAt?.toDate ? order.createdAt.toDate() : order.createdAt
        }))
      )
    ) as Observable<Orders[]>;
  }

  // ❌ Delete Order
  deleteOrder(id: string) {
    const orderDocRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderDocRef);
  }
}
