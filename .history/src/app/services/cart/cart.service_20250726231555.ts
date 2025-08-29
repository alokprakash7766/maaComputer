// src/app/services/cart/cart.service.ts

import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';

export interface CartItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  status?: boolean;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dbPath = '/cart';
  private cartRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.cartRef = collection(this.db, this.dbPath);
  }

  addToCart(item: CartItem): Promise<any> {
    item.status = true;
    item.createdAt = Date.now();
    return addDoc(this.cartRef, { ...item });
  }

  getCartItems(): Observable<CartItem[]> {
    return collectionData(this.cartRef, { idField: 'id' }) as Observable<CartItem[]>;
  }

  deleteCartItem(id: string) {
    return deleteDoc(doc(this.cartRef, id));
  }

  updateCartItem(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
