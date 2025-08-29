// src/app/services/cart/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModel } from '../../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartModel[] = [];
  private cartSubject = new BehaviorSubject<CartModel[]>([]);

  cart$ = this.cartSubject.asObservable();

  // Add item to cart
  addToCart(item: CartModel) {
    const index = this.cart.findIndex(p => p.productId === item.productId);
    if (index !== -1) {
      this.cart[index].quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
  }

  // Update item quantity
  updateQuantity(productId: string, quantity: number) {
    const item = this.cart.find(p => p.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
    this.cartSubject.next(this.cart);
  }

  // Remove item from cart
  removeItem(productId: string) {
    this.cart = this.cart.filter(p => p.productId !== productId);
    this.cartSubject.next(this.cart);
  }

  // Clear the entire cart
  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  // Get total amount (₹)
  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Get all items
  getItems(): CartModel[] {
    return [...this.cart];
  }
}
