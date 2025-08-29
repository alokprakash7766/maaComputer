import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const cartRef = collection(this.firestore, 'cart');
    collectionData(cartRef, { idField: 'id' }).subscribe((items) => {
      this.cartItems = items;
    });
  }

  // 🧮 Total per item
  getTotal(item: any): number {
    return item.price * item.quantity;
  }

  // 🧮 Subtotal for all
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // ❌ Remove from cart
  async removeItem(productId: string) {
    try {
      const cartItem = this.cartItems.find(item => item.productId === productId);
      if (!cartItem || !cartItem.id) return;

      await deleteDoc(doc(this.firestore, 'cart', cartItem.id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
}
