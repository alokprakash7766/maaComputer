import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderData: Orders = {
    customerName: '',
    email: '',
    mobile: '',
    address: '',
    productName: '',
    quantity: 1,
    price: 0,
    createdAt: new Date()
  };

  orders: Orders[] = [];

  constructor(private orderService: OrdersService) {
    this.loadOrders();
  }

  // Save order to Firebase
  submitOrder() {
    this.orderService.addOrder(this.orderData).then(() => {
      alert('Order placed successfully!');
      this.resetForm();
    });
  }

  // Load Orders
  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  // Delete Order
  removeOrder(id: string) {
    this.orderService.deleteOrder(id);
  }

  // Reset form
  resetForm() {
    this.orderData = {
      customerName: '',
      email: '',
      mobile: '',
      address: '',
      productName: '',
      quantity: 1,
      price: 0,
      createdAt: new Date()
    };
  }
}
