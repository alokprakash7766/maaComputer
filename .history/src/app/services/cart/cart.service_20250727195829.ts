// cart.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollection = collection(this.firestore, 'cart');

  constructor(private firestore: Firestore) {}

  addToCart(product: any): Promise<any> {
    const cartItem = {
      ...product,
      quantity: 1,
      addedAt: Date.now()
    };
    return addDoc(this.cartCollection, cartItem);
  }

  getCartItems(): Observable<any[]> {
    return collectionData(this.cartCollection, { idField: 'id' }) as Observable<any[]>;
  }

  removeCartItem(id: string) {
    return deleteDoc(doc(this.cartCollection, id));
  }
}
