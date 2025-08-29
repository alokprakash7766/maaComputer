import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Order } from '../../shared/models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private dbPath = 'orders';
  private orderRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.orderRef = collection(this.db, this.dbPath);
  }

  placeOrder(order: Order) {
    order.createdAt = new Date();
    return addDoc(this.orderRef, { ...order });
  }
}
