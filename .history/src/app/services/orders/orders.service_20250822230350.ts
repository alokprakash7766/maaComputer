import { Injectable } from '@angular/core';

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