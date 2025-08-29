import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  // store data in sessionStorage
  setData(res: any) {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("isLogged", "true");
    sessionStorage.setItem("uid", res.uid); // userId save
  }

  // get data
  getEmail() {
    return sessionStorage.getItem("email");
  }

  getIsLoggedIn() {
    return sessionStorage.getItem("isLogged");
  }

  // clear all data
  clear() {
    sessionStorage.clear();
  }

  // ✅ Get current logged-in user ID (from sessionStorage)
  getCurrentUserId(): string | null {
    return sessionStorage.getItem("uid");
  }

  // ✅ Alternative: Async from Firebase Auth directly
  async getCurrentUserIdAsync(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }
  TS2339: Property 'subscribe' does not exist on type 'void'.
src/app/customer/my-account/my-account.component.ts:27:40

}
