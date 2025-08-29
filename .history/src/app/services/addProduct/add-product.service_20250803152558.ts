import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private productCollection!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  addProduct(product: Product) {
    return addDoc(this.productCollection, product);
  }
}
