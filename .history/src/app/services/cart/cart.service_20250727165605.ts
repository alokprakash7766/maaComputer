import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dbPath = '/cart';
  private cartRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore, private router: Router) {
    this.cartRef = collection(this.db, this.dbPath);
  }

  saveToCart(product: any): Promise<any> {
    const cartItem = {
      ...product,
      quantity: 1,
      addedAt: Date.now()
    };
    return addDoc(this.cartRef, cartItem);
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }
}
