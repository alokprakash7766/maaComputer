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
  private cartCollection = collection(this.firestore, 'cart');

  constructor(private firestore: Firestore) {}

  addToCart(product: any): Promise<any> {
    return addDoc(this.cartCollection, product);
  }
}