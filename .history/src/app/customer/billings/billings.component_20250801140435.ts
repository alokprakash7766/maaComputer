import { Component } from '@angular/core';
import { Billing } from '../../shared/models/billing/billing.model';
import { BillingService } from '../../services/billing/billing.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  billing: Billing = {
    customerName: '',
    phone: '',
    address: '',
    totalAmount: 0,
    billingDate: new Date(),
    items: []  // Will be filled from cart
  };

  constructor(
    private billingService: BillingService,
    private cartService: CartService
  ) {}

  placeOrder() {
    const cartItems = this.cartService.getCartItems(); // should return items like { productName, price, quantity }

    this.billing.items = cartItems;
    this.billing.totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.billingService.saveBilling(this.billing).then(() => {
      alert('Order placed successfully!');
      this.cartService.clearCart(); // optional: clear after order
    });
  }
}
