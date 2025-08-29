import { Injectable } from '@angular/core';
import { DocumentData, CollectionReference, collection, addDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore/lite';
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

  addProduct(product: Product): Promise<any> {
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.productRef, { ...product });
  }
}
