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
import { CollectionReference, DocumentData } from 'firebase/firestore';

import { Category } from '../../shared/models/category/category.model';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../cart/cart.service'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/categories';
  private categoryRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore, private cartService: CartService) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  // Add a new category
  addCategory(category: Category): Promise<any> {
    category.status = true;
    category.createdAt = Date.now();
    return addDoc(this.categoryRef, { ...category });
  }

  // Get all categories
  getAllCategories(): Observable<Category[]> {
    return collectionData(this.categoryRef, { idField: "id" }) as Observable<Category[]>;
  }

  // Delete category by ID
  deleteCategory(id: string) {
    return deleteDoc(doc(this.categoryRef, id));
  }

  // Get single category by ID
  getSingleCategory(id: string): Observable<any> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return new Observable((observer) => {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next({ id: docSnap.id, ...docSnap.data() });
        } else {
          observer.error("Document not found");
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // Update category
  updateCategory(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  // Add product to cart
  addToCart(product: any) {
    const item: CartModel = {
      productId: product.id || '',   // Ensure 'id' is available
      name: product.name,
      price: product.price,
      image: product.image || '',
      quantity: 1
    };

    this.cartService.addToCart(item);
    alert('Added to cart');
  }
}
