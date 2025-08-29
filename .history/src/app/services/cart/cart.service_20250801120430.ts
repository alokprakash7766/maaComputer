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

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollection = collection(this.firestore, 'cart');

  constructor(private firestore: Firestore) {}

  // ✅ Add to cart (with duplicate check)
  async addToCart(product: any): Promise<any> {
    const existingItem = await this.findCartItemByProductId(product.productId);
    
    if (existingItem) {
      // 🔁 Increase quantity
      const docRef = doc(this.firestore, 'cart', existingItem.id);
      return updateDoc(docRef, {
        quantity: existingItem.quantity + 1
      });
    } else {
      // ➕ Add new item
      return addDoc(this.cartCollection, {
        ...product,
        quantity: 1
      });
    }
  }

  // 🔍 Find existing item by productId
  private async findCartItemByProductId(productId: string): Promise<any> {
    const q = query(this.cartCollection, where('productId', '==', productId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as any;
    }

    return null;
  }

  // 🔄 Get all cart items as Observable
  getCartItems(): Observable<any[]> {
    return collectionData(this.cartCollection, { idField: 'id' });
  }

  // ❌ Remove item by Firestore doc id
  removeFromCart(cartItemId: string): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return deleteDoc(docRef);
  }

  // 🔄 Update quantity manually
  updateQuantity(cartItemId: string, quantity: number): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return updateDoc(docRef, { quantity });
  }
}
