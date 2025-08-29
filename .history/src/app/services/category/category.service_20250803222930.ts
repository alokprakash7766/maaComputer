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

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private dbPath = '/products';
  private productRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath);
  }

  // ✅ Add new product
  addProduct(product: Product): Promise<any> {
    product.createdAt = Date.now();
    product.status = true;
    return addDoc(this.productRef, { ...product });
  }

  // ✅ Get all products
  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productRef, { idField: "id" }) as Observable<Product[]>;
  }

  // ✅ Delete product by ID
  deleteProduct(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }

  // ✅ Get single product by ID
  getSingleProduct(id: string): Observable<any> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return new Observable((observer) => {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next({ id: docSnap.id, ...docSnap.data() });
        } else {
          observer.error("Product not found");
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // ✅ Update product by ID
  updateProduct(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
