import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  constructor(private firestore: Firestore) {}

  // ✅ Get User Profile
  async getUserProfile(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }

  // ✅ Get User Orders
  async getUserOrders(uid: string) {
    const q = query(collection(this.firestore, 'orders'), where('uid', '==', uid));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // ✅ Update User Profile
  async updateUserProfile(uid: string, data: any) {
    const ref = doc(this.firestore, `users/${uid}`);
    return await import('@angular/fire/firestore').then(m => 
      m.updateDoc(ref, data)
    );
  }
}
