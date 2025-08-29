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

  addToCart(item: CartModel) {
    const index = this.cart.findIndex(p => p.productId === item.productId);
    if (index !== -1) {
      this.cart[index].quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.cart.find(p => p.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
    this.cartSubject.next(this.cart);
  }

  removeItem(productId: string) {
    this.cart = this.cart.filter(p => p.productId !== productId);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getItems(): CartModel[] {
    return [...this.cart];
  }
}
