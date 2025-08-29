import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore/lite';
import { addDoc, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
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
    return addDoc(this.productRef, { ...product });
    console.log(roduct);
  } 
}
