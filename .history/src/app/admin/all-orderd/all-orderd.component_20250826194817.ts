import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

@Component({
  selector: 'app-all-orderd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-orderd.component.html',
  styleUrls: ['./all-orderd.component.css']
})
export class AllOrderdComponent implements OnInit {
  orders: Orders[] = [];

  private ordersService = inject(OrdersService);

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data: Orders[]) => {
      this.orders = data;
    });
  }
}
