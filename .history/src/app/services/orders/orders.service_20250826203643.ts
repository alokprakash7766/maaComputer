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

  // Upload image and return URL
  async uploadImage(file: File): Promise<string> {
    try {
      const filePath = `orders/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (err) {
      console.error('uploadImage error:', err);
      throw err; // rethrow so caller knows upload failed
    }
  }

  // Add order to Firestore (returns the created doc ref)
  async addOrder(order: Orders): Promise<any> {
    try {
      const ordersRef = collection(this.firestore, 'orders');
      // ensure createdAt exists and is a JS Date (Firestore will convert)
      const payload = {
        ...order,
        createdAt: order.createdAt ?? new Date()
      };
      return await addDoc(ordersRef, payload);
    } catch (err) {
      console.error('addOrder error:', err);
      throw err;
    }
  }

  // Get orders (convert Firestore Timestamp -> JS Date)
  getOrders(): Observable<Orders[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }).pipe(
      map((orders: any[]) =>
        orders.map(order => ({
          ...order,
          createdAt: order?.createdAt?.toDate ? order.createdAt.toDate() : order.createdAt
        }))
      )
    ) as Observable<Orders[]>;
  }

  // Delete (kept for completeness)
  async deleteOrder(id: string): Promise<void> {
    try {
      const orderDocRef = doc(this.firestore, `orders/${id}`);
      await deleteDoc(orderDocRef);
    } catch (err) {
      console.error('deleteOrder error:', err);
      throw err;
    }
  }
}
