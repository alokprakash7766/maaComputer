import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, collection, CollectionReference } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore/lite';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private dbPath = '/product';
  private protecteRef: CollectionReference<DocumentData>;
  
  constructor(private db: Firestore) {
    this.productRef = collection(this.db, this.dbPath);
  }

  addCategory(product: Product): Promise<any> {
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.protecteRefRef, { ...product });
  }
}
