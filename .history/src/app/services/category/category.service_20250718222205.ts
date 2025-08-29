import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
   // ✅ Yeh method add karo:
  getAllCategories(): Observable<Category[]> {
    const categoryRef = collection(this.firestore, 'categories');
    return import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Model } from '../core';

    @Injectable({ providedIn: 'root' })
    export class ModelService extends EntityCollectionServiceBase<Model> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Model', serviceElementsFactory);
      }
    }(categoryRef, { idField: 'id' }) as Observable<Category[]>;
  }
}
