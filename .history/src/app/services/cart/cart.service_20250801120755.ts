import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  collectionData,
  query,
  where,
  getDocs,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CartModel } from '../../shared/models/cart/cart.model'; // adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private firestore: Firestore) {}

  async addToCart(product: CartModel): Promise<any> {
    const cartCollection = collection(this.firestore, 'cart');
    const existingItem = await this.findCartItemByProductId(product.productId);

    if (existingItem) {
      const docRef = doc(this.firestore, 'cart', existingItem.id);
      return updateDoc(docRef, {
        quantity: existingItem.quantity + 1
      });
    } else {
      return addDoc(cartCollection, {
        ...product,
        quantity: 1
      });
    }
  }

  private async findCartItemByProductId(productId: string): Promise<CartModel & { id: string } | null> {
    const cartCollection = collection(this.firestore, 'cart');
    const q = query(cartCollection, where('productId', '==', productId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as CartModel & { id: string };
    }

    return null;
  }

  getCartItems(): Observable<(CartModel & { id: string })[]> {
    const cartCollection = collection(this.firestore, 'cart');
    return collectionData(cartCollection, { idField: 'id' }) as Observable<(CartModel & { id: string })[]>;
  }

  removeFromCart(cartItemId: string): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return deleteDoc(docRef);
  }

  updateQuantity(cartItemId: string, quantity: number): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return updateDoc(docRef, { quantity });
  }
}
