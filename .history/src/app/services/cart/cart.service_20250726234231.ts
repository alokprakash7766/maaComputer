import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Cart } from '../../shared/models/cart/cart.model';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbPath = '/cart';
  private cartRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.cartRef = collection(this.firestore, this.dbPath);
  }

  // ✅ Add item to cart
  addToCart(item: Cart): Promise<any> {
    item.createdAt = Date.now();
    return addDoc(this.cartRef, { ...item });
  }

  // ✅ Get all cart items
  getCartItems(): Observable<Cart[]> {
    return collectionData(this.cartRef, { idField: 'id' }) as Observable<Cart[]>;
  }

  // ✅ Delete item
  deleteCartItem(id: string) {
    return deleteDoc(doc(this.cartRef, id));
  }

  // ✅ Update item
  updateCartItem(id: string, data: Partial<Cart>): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
