import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../shared/models/category/cat';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) {}

  addCategory(category: Category) {
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }
}
