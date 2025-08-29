import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { BillingService } from '../../services/billing/billing.service';
import { Billing } from '../../shared/models/billing/billing.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, NgIf, NgFor],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {
  billing: Billing = {
    customerName: '',
    phone: '',
    address: '',
    totalAmount: 0,
    billingDate: new Date(),
    items: []
  };

  billings: Billing[] = [];

  constructor(
    private billingService: BillingService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.billingService.getAllBillings().subscribe((data: Billing[]) => {
      this.billings = data;
    });
  }

  placeOrder() {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.billing.items = cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      this.billing.totalAmount = this.billing.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      this.billing.billingDate = new Date();

      this.billingService.saveBilling(this.billing).then(() => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
      });
    });
  }

}
