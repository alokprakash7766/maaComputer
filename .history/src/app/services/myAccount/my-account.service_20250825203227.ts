import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  // ✅ User Profile Update
  async updateUserProfile(uid: string, data: { name?: string; address?: string; phone?: string }) {
    const userRef = doc(this.firestore, `users/${uid}`);
    await updateDoc(userRef, data);
  }

  // ✅ User Profile Fetch
  async getUserProfile(uid: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  }

  // ✅ User Orders Fetch
  async getUserOrders(uid: string) {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(ordersRef, where('userId', '==', uid));
    const querySnap = await getDocs(q);
    return querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
