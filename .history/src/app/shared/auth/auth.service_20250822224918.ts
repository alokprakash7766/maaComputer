import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ✅ store data in sessionStorage
  setData(res: any) {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("isLogged", "true");
  }

  // ✅ get all data at once
  getData() {
    return {
      email: sessionStorage.getItem("email"),
      name: sessionStorage.getItem("name"),
      userType: sessionStorage.getItem("userType"),
      isLogged: sessionStorage.getItem("isLogged") === "true"
    };
  }

  // ✅ get individual values
  getEmail() {
    return sessionStorage.getItem("email");
  }

  getName() {
    return sessionStorage.getItem("name");
  }

  getUserType() {
    return sessionStorage.getItem("userType");
  }

  getIsLoggedIn() {
    return sessionStorage.getItem("isLogged") === "true";
  }

  // ✅ clear data
  clear() {
    sessionStorage.clear();
  }
}
