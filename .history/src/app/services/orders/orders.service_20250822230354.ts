import { Injectable } from '@angular/core';
import { Orders } from '../../shared/models/orders/orders.model';

Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderData?: Orders;

  constructor() {}

  setOrder(order: Orders) {
    this.orderData = order;
  }

  getOrder(): Orders | undefined {
    return this.orderData;
  }
}