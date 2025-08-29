import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'myCart';

  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  deleteItem(index: number): void {
    const cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
