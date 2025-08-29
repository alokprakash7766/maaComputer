import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store data
  setData(res: any) {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("mobileNo", res.mobileNo); // ✅ mobile भी save करना होगा
    sessionStorage.setItem("userType", res.userType);
    sessionStorage.setItem("isLogged", "true");
  }

  // get full data
  getData() {
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const mobileNo = sessionStorage.getItem("mobileNo");

    if (!email || !name) return null;  // अगर login नहीं किया है

    return {
      email,
      name,
      mobileNo
    };
  }

  // get email only
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
