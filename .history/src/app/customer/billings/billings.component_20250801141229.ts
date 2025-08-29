import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { BillingService } from '../../services/billing/billing.service';
import { Billing } from '../../shared/models/billing/billing.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent {
  billing: Billing = {
    customerName: '',
    phone: '',
    address: '',
    totalAmount: 0,
    billingDate: new Date(),
    items: []
  };

  constructor(
    private billingService: BillingService,
    private cartService: CartService
  ) {}

  placeOrder() {
  this.cartService.getCartItems().subscribe((cartItems) => {
    this.billing.items = cartItems.map(item => ({
      productName: item.title,
      quantity: item.quantity,
      price: item.price
    }));

    this.billing.totalAmount = this.billing.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    this.billingService.saveBilling(this.billing).then(() => {
      alert('Order placed successfully!');
      this.cartService.clearCart();
    });
  });
}

}
