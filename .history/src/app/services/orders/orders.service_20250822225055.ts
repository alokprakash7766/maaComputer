import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Orders } from '../../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private fs: Firestore) {}

  // Place order
  async placeOrder(order: Orders) {
    const orderRef = collection(this.fs, 'orders');
    return await addDoc(orderRef, order);
  }
}
