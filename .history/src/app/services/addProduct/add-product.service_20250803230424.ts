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

  addProduct(product: Product): Promise<any> {
    return addDoc(this.productRef, product);
  }

  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productRef, { idField: 'id' }) as Observable<Product[]>;
  }

  deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(productDoc);
  }

  getSingleProduct(id: string): Promise<Product> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (snapshot.exists()) {
        return { ...(snapshot.data() as Product), id: snapshot.id };
      } else {
        throw new Error("Product not found");
      }
    });
  }

  updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
