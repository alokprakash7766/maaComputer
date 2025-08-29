import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Product } from '../../shared/models/addProduct/add-product.model';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

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
}
