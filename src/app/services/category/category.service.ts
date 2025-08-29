import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Category } from '../../shared/models/category/category.model';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';

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

 deleteCategory(id: any) {
    return deleteDoc(doc(this.categoryRef, id));
  }

  getSingleCategory(id: string): Observable<any> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return new Observable((observer) => {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next({ id: docSnap.id, ...docSnap.data() });
        } else {
          observer.error("Document not found");
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }


  updateCategory(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
