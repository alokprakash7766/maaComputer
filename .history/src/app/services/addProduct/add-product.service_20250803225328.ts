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
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  updateProduct(id: any, formData: any) {
    throw new Error('Method not implemented.');
  }
  getSingleProduct(id: any) {
    throw new Error('Method not implemented.');
  }
  private dbPath = '/product';
  private productRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath);
  }

  addProduct(product: Product): Promise<any> {
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.productRef, { ...product });
  }

  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productRef, { idField: 'id' }) as Observable<Product[]>;
  }
  
  deleteProduct(id: string) {
    const productDoc = doc(this.db, 'product', id); 
    return deleteDoc(productDoc);
  }

  getSingleProduct(id: string): Promise<any> {
  const docRef = doc(this.db, `${this.dbPath}/${id}`);
  return getDoc(docRef).then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      throw new Error("Product not found");
    }
  });
}
  updateProduct(id: string, data: any): Promise<void> {
      const docRef = doc(this.db, `${this.dbPath}/${id}`);
      return updateDoc(docRef, data);
    }
}
