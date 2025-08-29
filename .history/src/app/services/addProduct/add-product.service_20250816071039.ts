import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private dbPath = 'product';
  private productRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Product
  addProduct(product: Product): Promise<any> {
    return addDoc(this.productRef, product);
  }

  // ✅ Get All Products
  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productRef, { idField: 'id' }) as Observable<Product[]>;
  }

  // ✅ Delete Product by ID
  deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(productDoc);
  }

  // ✅ Get Single Product by ID
  getSingleProduct(id: string): Promise<Product> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error("Product not found");
      }
      return { ...(snapshot.data() as Product), id: snapshot.id };
    });
  }

  // ✅ Update Product by ID
  updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
