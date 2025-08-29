import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollection = collection(this.firestore, 'cart');

  constructor(private firestore: Firestore) {}

  addToCart(product: any): Promise<any> {
    return addDoc(this.cartCollection, product);
  }
}