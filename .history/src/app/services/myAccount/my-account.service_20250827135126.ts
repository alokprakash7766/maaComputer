import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth, updatePassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // 🔹 Update Profile in Firestore
  async updateProfile(userId: string, data: any): Promise<void> {
    const userRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userRef, data);
  }

  // 🔹 Get User Data
  async getUser(userId: string): Promise<any> {
    const userRef = doc(this.firestore, `users/${userId}`);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  }

  // 🔹 Change Password in Firebase Auth
  async changePassword(newPassword: string): Promise<void> {
    if (this.auth.currentUser) {
      await updatePassword(this.auth.currentUser, newPassword);
    } else {
      throw new Error("No logged-in user found");
    }
  }
}
