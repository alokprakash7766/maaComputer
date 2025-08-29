// src/app/services/orders/orders.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firestore: Firestore) {}

  // Add Order
  addOrder(order: Orders) {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, order);
  }

  // Get All Orders
  getOrders(): Observable<Orders[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' }) as Observable<Orders[]>;
  }

  // Delete Order
  deleteOrder(id: string) {
    const orderDocRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderDocRef);
  }
}
