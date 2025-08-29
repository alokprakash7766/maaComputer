import { inject, Injectable } from '@angular/core';
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
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private dbPath = 'orders';   // 🔹 same as services
  private ordersRef: CollectionReference<DocumentData>;
private firestore = inject(Firestore);
  private storage = inject(Storage);
  constructor(private db: Firestore) {
    this.ordersRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Order
  addOrder(order: Orders): Promise<any> {
    order.createdAt = Date.now();
    return addDoc(this.ordersRef, order);
  }

  // ✅ Get All Orders
  getAllOrders(): Observable<Orders[]> {
    return collectionData(this.ordersRef, { idField: 'id' }) as Observable<Orders[]>;
  }

  // ✅ Delete Order by ID
  deleteOrder(id: string): Promise<void> {
    const orderDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(orderDoc);
  }

  // ✅ Get Single Order by ID
  getSingleOrder(id: string): Promise<Orders> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error('Order not found');
      }
      return { ...(snapshot.data() as Orders), id: snapshot.id };
    });
  }

  // ✅ Update Order by ID
  updateOrder(id: string, data: Partial<Orders>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
