import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ Store data
  setData(res: any) {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("isLogged", "true");
  }

  // ✅ Get individual data
  getEmail() {
    return sessionStorage.getItem("email");
  }

  getIsLoggedIn() {
    return sessionStorage.getItem("isLogged") === 'true';
  }

  // ✅ Clear all
  clear() {
    sessionStorage.clear();
  }

  // ✅ 🔥 Implemented getData method (full user data)
  getData(): any | null {
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const userType = sessionStorage.getItem("userType");

    if (email && name && userType) {
      return {
        email,
        name,
        userType
      };
    }

    return null;
  }
}
