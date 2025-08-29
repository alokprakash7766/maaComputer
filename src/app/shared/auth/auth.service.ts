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
     sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("phone", res.phone);        // ✅ add
    sessionStorage.setItem("address", res.address);    // ✅ add
    sessionStorage.setItem("isLogged", "true");
    sessionStorage.setItem("createdAt", res.createdAt);
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
  
}
