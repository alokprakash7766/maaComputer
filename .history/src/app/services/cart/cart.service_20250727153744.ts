import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModel } from '../../shared/models/cart/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartModel[] = [];
  private cartSubject = new BehaviorSubject<CartModel[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartModel) {
    const existing = this.cartItems.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.cartItems.find(i => i.productId === id);
    if (item && quantity > 0) item.quantity = quantity;
    this.cartSubject.next(this.cartItems);
  }

  removeItem(id: string) {
    this.cartItems = this.cartItems.filter(i => i.productId !== id);
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getTotal() {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
