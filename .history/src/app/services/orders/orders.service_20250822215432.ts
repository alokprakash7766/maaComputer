import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentData,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private dbPath = 'orders';
  private ordersRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.ordersRef = collection(this.db, this.dbPath);
  }

  // Place a new order
  addOrder(order: Orders): Promise<any> {
    return addDoc(this.ordersRef, order);
  }

  // Get all orders
  getAllOrders(): Observable<Orders[]> {
    return collectionData(this.ordersRef, { idField: 'id' }) as Observable<Orders[]>;
  }

  // Update order
  updateOrder(id: string, data: Partial<Orders>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  // Delete order
  deleteOrder(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
