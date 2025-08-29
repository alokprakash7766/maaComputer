import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'myCart'; // key used in localStorage

  constructor() { }

  // Add product to cart
  addToCart(product: any): void {
    const currentCart = this.getCart();
    currentCart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
  }

  // Get all cart items
  getCart(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  // Delete an item by index
  deleteItem(index: number): void {
    const currentCart = this.getCart();
    currentCart.splice(index, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
  }

  // Clear entire cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
