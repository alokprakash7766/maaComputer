import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fs: Firestore) {}

  // Place order
  async placeOrder(order: Order) {
    const orderRef = collection(this.fs, 'orders');
    return await addDoc(orderRef, order);
  }
}
