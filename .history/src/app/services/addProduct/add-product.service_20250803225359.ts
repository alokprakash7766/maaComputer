import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  CollectionReference,
  DocumentData,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private dbPath = '/product';
  private productRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath);
  }

  // ✅ Add product
  addProduct(product: Product): Promise<any> {
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.productRef, { ...product });
  }

  // ✅ Get all products
  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productRef, { idField: 'id' }) as Observable<Product[]>;
  }

  // ✅ Delete a product
  deleteProduct(id: string) {
    const productDoc = doc(this.db, `${this.dbPath}/${id}`); 
    return deleteDoc(productDoc);
  }

  // ✅ Get single product by ID
  getSingleProduct(id: string): Promise<Product> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.data() as Product;
      } else {
        throw new Error("Product not found");
      }
    });
  }

  // ✅ Update product
  updateProduct(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
