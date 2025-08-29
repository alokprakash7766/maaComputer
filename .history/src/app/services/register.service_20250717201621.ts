// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../';  // ध्यान दें: ये model आपके पास होना चाहिए

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private firestore: Firestore) {}

  registerUser(user: User) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }
}
