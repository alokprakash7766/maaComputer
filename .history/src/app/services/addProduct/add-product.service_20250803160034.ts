import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, collection, CollectionReference } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore/lite';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  private dbPath = '/categories';
  private categoryRef: CollectionReference<DocumentData>;
  cartService: any;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  addCategory(product: Product): Promise<any> {
    product.status = true;
    product.createdAt = Date.now();
    return addDoc(this.categoryRef, { ...product });
  }
}
