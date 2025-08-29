import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Category } from '../../shared/models/category/category.model'; /

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private dbPath = '/categories';

  private categoryRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }


  addCategory(categoryObj: Category) {
    return addDoc(this.categoryRef, { ...categoryObj });
  }

}
