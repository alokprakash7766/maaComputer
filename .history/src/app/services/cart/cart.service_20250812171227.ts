// src/app/services/cart/cart.service.ts
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
  removeItem(id: any) {
    throw new Error('Method not implemented.');
  }
  private buyNowItem: CartModel | null = null;

  constructor(private firestore: Firestore) { }

  // Add to Cart
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

  // Find Existing Cart Item
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

  // Get Cart Items
  getCartItems(): Observable<(CartModel & { id: string })[]> {
    const cartCollection = collection(this.firestore, 'cart');
    return collectionData(cartCollection, { idField: 'id' }) as Observable<(CartModel & { id: string })[]>;
  }

  // Remove from Cart
  removeFromCart(cartItemId: string): Promise<void> {
  const docRef = doc(this.firestore, 'cart', cartItemId);
  return deleteDoc(docRef);
}

  // Update Quantity
  updateQuantity(cartItemId: string, quantity: number): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return updateDoc(docRef, { quantity });
  }

  // Buy Now Handlers
  setBuyNowItem(item: CartModel): void {
    this.buyNowItem = item;
  }

  getBuyNowItem(): CartModel | null {
    return this.buyNowItem;
  }

  clearBuyNowItem(): void {
    this.buyNowItem = null;
  }
  clearCart() {
    const cartRef = collection(this.firestore, 'cart');
    collectionData(cartRef, { idField: 'id' }).subscribe((items) => {
      items.forEach((item: any) => {
        const itemDoc = doc(this.firestore, `cart/${item.id}`);
        deleteDoc(itemDoc);
      });
    });
  }
}
