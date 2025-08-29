import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Category } from '../../shared/models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) {}

  addCategory(category: Category) {
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }
   // ✅ Yeh method add karo:
  getAllCategories(): Observable<Category[]> {
    const categoryRef = collection(this.firestore, 'categories');
    return collectionData(categoryRef, { idField: 'id' }) as Observable<Category[]>;
  }
}
