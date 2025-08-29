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

  constructor(private firestore: Firestore) {}

  // ✅ Add to cart
  async addToCart(product: any): Promise<any> {
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

  // 🔍 Find by productId
  private async findCartItemByProductId(productId: string): Promise<any> {
    const cartCollection = collection(this.firestore, 'cart');
    const q = query(cartCollection, where('productId', '==', productId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as any;
    }

    return null;
  }

  // 🔄 Get cart items
  getCartItems(): Observable<any[]> {
    const cartCollection = collection(this.firestore, 'cart');
    return collectionData(cartCollection, { idField: 'id' });
  }

  // ❌ Remove item
  removeFromCart(cartItemId: string): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return deleteDoc(docRef);
  }

  // 🔄 Update quantity
  updateQuantity(cartItemId: string, quantity: number): Promise<void> {
    const docRef = doc(this.firestore, 'cart', cartItemId);
    return updateDoc(docRef, { quantity });
  }
}
