import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) { }

  getSingleCategory(id: string): Observable<any> {
    const categoryDocRef = doc(this.firestore, 'categories', id);
    return from(getDoc(categoryDocRef));
  }

  updateCategory(id: string, data: any): Promise<void> {
    const categoryDocRef = doc(this.firestore, 'categories', id);
    return updateDoc(categoryDocRef, data);
  }
}
