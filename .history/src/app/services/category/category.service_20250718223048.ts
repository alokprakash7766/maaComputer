import { Injectable } from '@angular/core';
import { Firestore, collection,
  collectionData, addDoc, } from '@angular/fire/firestore';
import { Category } from '../../shared/models/category/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) {}

  addCategory(category: Category) {
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }
  // ✅ Get all categories properly using collectionData
  getAllCategories(): Observable<Category[]> {
    const categoryRef = collection(this.firestore, 'categories');
    return collectionData(categoryRef, { idField: 'id' }) as Observable<Category[]>;
  }
}
