import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getData() {
    throw new Error('Method not implemented.');
  }

  // store data
  setData(res: any) {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("isLogged", "true");
  }

  // get data
  getEmail() {
    return sessionStorage.getItem("email");
  }

  getIsLoggedIn() {
    return sessionStorage.getItem("isLogged");
  }

  // clear data from session
  clear() {
    sessionStorage.clear();
  }
  constructor(private afAuth: AngularFireAuth) {}

  // ✅ Get current logged-in user ID
  getCurrentUserId(): string | null {
    return this.afAuth.currentUser
      ? (this.afAuth.currentUser as any)?.uid || null
      : null;
  }

  // ✅ Or if async
  async getCurrentUserIdAsync(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

}
