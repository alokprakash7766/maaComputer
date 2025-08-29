import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.ordersCollection = collection(this.firestore, 'orders');
  }

  addOrder(order: Orders) {
    return addDoc(this.ordersCollection, order);
  }
}
