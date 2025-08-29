import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, doc, DocumentData, Firestore, collection, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  private userRef: CollectionReference<DocumentData>;
  authService: any;

  constructor(
    private db: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private AuthService: AuthService

  ) {
    this.userRef = collection(this.db, this.dbPath);
  }

  register(data: any): Observable<any> {
    this.spinner.show();

    return from(
      createUserWithEmailAndPassword(this.auth, data.email, data.password)
        .then((res: any) => {
          const uid = res.user.uid;
          data.uid = uid;
          data.status = true;
          data.userType = 2;
          data.createdAt = Date.now();
          delete data.password;

          return setDoc(doc(this.userRef, uid), data)
            .then(() => {
              this.spinner.hide();
              this.toastr.success("User Registered Successfully");
              this.router.navigateByUrl("/login");
              return uid;
            });
        })
        .catch((err: any) => {
          this.spinner.hide();

          if (err.code === 'auth/email-already-in-use') {
            this.toastr.error("Email is already registered.");
          } else {
            this.toastr.error("Something went wrong.");
          }

          throw err; // Rethrow so it can be caught in the component
        })
    );
  }
  // login

  return signInWithEmailAndPassword(this.auth, email, password).then(async (res: any) => {
  try {
    let uid = res.user.uid;
    let userSnap = await getDoc(doc(this.userRef, uid));

    if (!userSnap.exists()) {
      this.spinner.hide();
      this.toastr.error("User not found in database");
      return;
    }

    let userData = userSnap.data();

    if (userData['status'] === false) {
      this.spinner.hide();
      this.toastr.error("Your account is inactive", "Please contact admin");
    } else {
      this.spinner.hide();
      this.authService.setData(userData);
      if (userData['userType'] == 1) {
        this.router.navigateByUrl("/admin/dashboard");
      } else if (userData['userType'] == 2) {
        this.router.navigateByUrl("/home");
      } else {
        this.toastr.error("Invalid user type");
      }
    }
  } catch (e) {
    this.spinner.hide();
    this.toastr.error("Something went wrong while fetching user data");
  }
},
(err: any) => {
  this.spinner.hide();
  console.log(err);
  this.toastr.error(err?.message || "Authentication failed");
});




}
