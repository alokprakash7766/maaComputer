import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, doc, DocumentData, Firestore, collection, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  private userRef: CollectionReference<DocumentData>;

  constructor(
    private db: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
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
              return uid; // Optionally return UID or success message
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
}
