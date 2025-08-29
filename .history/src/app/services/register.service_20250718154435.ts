// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../shared/models/user/user.model';
import { User } from '../shared/models/';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private firestore: Firestore) {}

  registerUser(user: User) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }
  addCategory(category: Category) {
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }
}
