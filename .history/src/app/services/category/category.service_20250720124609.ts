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

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) {}

  addCategory(category: Category): Promise<any> {
        category.status = true
    category.createdAt = Date.now()
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }
  getAllCategories(): Observable<Category[]> {
    const categoryRef = collection(this.firestore, 'categories');
    return collectionData(categoryRef, { idField: 'id' }) as Observable<Category[]>;
  }


  deleteCategory(id: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    return deleteDoc(categoryDocRef);
  }
}
