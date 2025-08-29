import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartModel[] = [];
  subtotal = 0;
  shipping = 3;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    alert("Purchase Successful");
    this.cartService.clearCart();
  }
}
