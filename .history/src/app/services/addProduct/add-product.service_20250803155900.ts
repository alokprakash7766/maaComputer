import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { collection, CollectionReference } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/categories';
  private categoryRef: CollectionReference<DocumentData>;
  cartService: any;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  addCategory(category: Category): Promise<any> {
    category.status = true;
    category.createdAt = Date.now();
    return addDoc(this.categoryRef, { ...category });
  }
}
