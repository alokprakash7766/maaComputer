import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: Orders[] = [];

  constructor(private ordersService: OrdersService) {}

  

  // ✅ Add new order example
  addOrder() {
    const newOrder = new Orders(
    );

    this.ordersService.addOrder(newOrder)
      .then(() => console.log("Order placed successfully"))
      .catch((err) => console.error("Error placing order", err));
  }
}
