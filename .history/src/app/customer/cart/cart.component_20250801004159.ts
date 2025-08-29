import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartModel } from '../../shared/models/cart/cart.model';

// ✅ Import control flow blocks
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartModel[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data: CartModel[]) => {
      console.log("Loaded cart items from Firebase:", data);
      this.cartItems = data;
    });
  }

  getTotal(item: CartModel): number {
    return item.price * item.quantity;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + this.getTotal(item), 0);
  }

  removeItem(id: string) {
  this.cartService.removeCartItem(id)
    .then(() => {
      // ✅ Also remove it from browser (local array)
      this.cartItems = this.cartItems.filter(item => item.productId !== id);
      console.log('Item removed successfully.');
    })
    .catch((error) => {
      console.error('Error removing item:', error);
    });
}
}
