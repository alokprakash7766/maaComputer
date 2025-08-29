// src/app/services/orders/orders.service.ts
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { OrderModel } from '../../shared/models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firestore: Firestore) {}

  addOrder(order: OrderModel) {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, order);
  }
}
