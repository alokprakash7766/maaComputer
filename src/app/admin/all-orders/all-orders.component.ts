import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: Orders[] = [];

  private ordersService = inject(OrdersService);

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data: Orders[]) => {
      this.orders = data;
    });
  }
}
