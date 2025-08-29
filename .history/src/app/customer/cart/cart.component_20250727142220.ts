import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartModel } from '../../shared/models/cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true
})
export class CartComponent implements OnInit {
  cartItems: CartModel[] = [];
  subtotal = 0;
  shipping = 3.00;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      this.total = this.subtotal + this.shipping;
    });
  }

  increaseQty(item: CartModel) {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decreaseQty(item: CartModel) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.quantity - 1);
    }
  }

  removeItem(id: string) {
    this.cartService.removeItem(id);
  }

  buyNow() {
    alert('Proceeding to checkout...');
    this.cartService.clearCart();
  }
}
