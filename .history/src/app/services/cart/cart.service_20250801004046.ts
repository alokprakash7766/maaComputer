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
import { CartModel } from '../../shared/models/cart/cart.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollection;

  constructor(private firestore: Firestore, private router: Router) {
    this.cartCollection = collection(this.firestore, 'cart');
  }

  addToCart(product: CartModel): Promise<any> {
    const cartItem = {
      ...product,
      addedAt: Date.now()
    };
    return addDoc(this.cartCollection, cartItem).then(() => {
      this.router.navigateByUrl("/cart");
    });
  }

  getCartItems(): Observable<CartModel[]> {
    return collectionData(this.cartCollection, { idField: 'id' }) as Observable<CartModel[]>;
  }

  removeCartItem(id: string) {
    return deleteDoc(doc(this.cartCollection.firestore, 'cart', id));
  }
  
}
