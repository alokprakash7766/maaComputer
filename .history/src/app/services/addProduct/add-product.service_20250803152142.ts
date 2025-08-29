import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection = collection(this.firestore, 'products');

  constructor(private firestore: Firestore) {}

  addProduct(product: Product) {
    return addDoc(this.productCollection, product);
  }
}
