import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import {
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  collection,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  private userRef: CollectionReference<DocumentData>;

  // Firestore injection
  private db: Firestore = inject(Firestore);

  constructor(
    private auth: Auth,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userRef = collection(this.db, this.dbPath);
  }

  //  Register
  register(data: any) {
    this.spinner.show();
    return createUserWithEmailAndPassword(this.auth, data.email, data.password).then((res: any) => {
      let uid = res.user.uid;
      data.uid = uid;
      data.status = true;
      data.userType = 2;
      data.createdAt = Date.now();
      delete data.password;

      setDoc(doc(this.userRef, uid), data).then(() => {
        this.spinner.hide();
        this.toastr.success("User Registered Successfully");
        this.router.navigateByUrl("/login");
      }).catch((err: any) => {
        this.spinner.hide();
        console.error(err);
        this.toastr.error(err.message || err);
      });

    }).catch((err: any) => {
      this.spinner.hide();
      console.error(err);
      this.toastr.error(err.message || err);
    });
  }

  // 🔹 Login
  login(email: any, password: any) {
    this.spinner.show();
    return signInWithEmailAndPassword(this.auth, email, password).then(async (res: any) => {
      let uid = res.user.uid;
      let userSnap = await getDoc(doc(this.userRef, uid));

      if (userSnap.exists()) {
        let userData = userSnap.data();
        if (userData['status'] == false) {
          this.spinner.hide();
          this.toastr.error("Your Account is Inactive", "Please Contact Admin");
        } else {
          this.spinner.hide();
          this.authService.setData(userData);
          if (userData['userType'] == 1) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (userData['userType'] == 2) {
            this.router.navigateByUrl("/home");
          } else {
            this.toastr.error("Invalid User Type");
          }
        }
      } else {
        this.spinner.hide();
        this.toastr.error("User not found");
      }
    }).catch((err: any) => {
      this.spinner.hide();
      console.error(err);
      this.toastr.error(err.message || "Login Failed", "Error");
    });
  }

  async forgotPassword(email: string) {
    try {
      this.spinner.show();
      await sendPasswordResetEmail(this.auth, email);
      this.spinner.hide();
      this.toastr.success('Password reset email sent!', 'Check your inbox');
    } catch (error: any) {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    }
  }


  async getUserData(uid: string) {
    return this.ngZone.run(async () => {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    });
  }
}
