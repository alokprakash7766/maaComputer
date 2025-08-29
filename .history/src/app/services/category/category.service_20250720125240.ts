import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Category } from '../../shared/models/category/category.model';
import { Observable } from 'rxjs';
// import { Category } from '../models/category.model';

import { CollectionReference } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/categories';
  private categoryRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  addCategory(category: Category): Promise<any> {
    category.status = true;
    category.createdAt = Date.now();
    return addDoc(this.categoryRef, { ...category });
  }

  getAllCategories(): Observable<Category[]> {
    return collectionData(this.categoryRef, { idField: "id" }) as Observable<Category[]>;
  }

  deleteCategory(id: string): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
