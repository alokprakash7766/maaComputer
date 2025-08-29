import { Injectable } from '@angular/core';


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
  addToCart(item: CartItem): Promise<any> {
    item.createdAt = Date.now();
    return addDoc(this.cartRef, { ...item });
  }

  // ✅ Get all cart items
  getCartItems(): Observable<CartItem[]> {
    return collectionData(this.cartRef, { idField: 'id' }) as Observable<CartItem[]>;
  }

  // ✅ Delete item
  deleteCartItem(id: string) {
    return deleteDoc(doc(this.cartRef, id));
  }

  // ✅ Update item
  updateCartItem(id: string, data: Partial<CartItem>): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
