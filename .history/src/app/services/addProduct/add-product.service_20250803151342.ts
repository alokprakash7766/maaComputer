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
import { Product } from '../../shared/models/product/product.model';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
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

  deleteProduct(id: any) {
    return deleteDoc(doc(this.productRef, id));
  }

  getSingleProduct(id: string): Observable<any> {
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

  updateProduct(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
