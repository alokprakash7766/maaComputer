import { Injectable } from '@angular/core';
import { DocumentData, CollectionReference, collection, addDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore/lite';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private dbPath = '/product';
  private productRef: CollectionReference<DocumentData>; // ✅ fixed name

  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath); // ✅ correct reference
  }

  addProduct(product: Product): Promise<any> { // ✅ renamed for clarity
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.productRef, { ...product }); // ✅ correct reference
  }
}
