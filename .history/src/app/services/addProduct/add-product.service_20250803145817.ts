import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private productCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  addProduct(productData: addProduct) {
    return addDoc(this.productCollection, productData);
  }
}
