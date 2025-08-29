import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersCollection;

  constructor(private firestore: Firestore) {
    this.ordersCollection = collection(this.firestore, 'orders'); // Firebase collection
  }

  // ✅ Add order
  addOrder(order: Orders) {
    return addDoc(this.ordersCollection, { ...order });
  }

  // ✅ Get all orders (Observable)
  getAllOrders(): Observable<Orders[]> {
    return collectionData(this.ordersCollection, { idField: 'id' }) as Observable<Orders[]>;
  }

  // ✅ Update order
  updateOrder(id: string, data: Partial<Orders>) {
    const orderDoc = doc(this.firestore, `orders/${id}`);
    return updateDoc(orderDoc, { ...data });
  }

  // ✅ Delete order
  deleteOrder(id: string) {
    const orderDoc = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderDoc);
  }
}
