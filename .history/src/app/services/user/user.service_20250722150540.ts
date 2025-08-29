import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, doc, DocumentData, Firestore, collection, addDoc, setDoc, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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


  register(data: any) {
    this.spinner.show()
    return createUserWithEmailAndPassword(this.auth, data.email, data.password).then((res: any) => {
      let uid = res.user.uid
      data.uid = uid
      data.status = true
      data.userType = 2
      data.createdAt = Date.now()
      delete data.password
      setDoc(doc(this.userRef, uid), data).then((r: any) => {
        this.spinner.hide()
        this.toastr.success("User Registered Successfully")
        this.router.navigateByUrl("/login")
      },
        (err: any) => {
          this.spinner.hide()
          console.log(err);
          this.toastr.error("Something Went Wrong")
        }
      )
    },
      (err: any) => {
        this.spinner.hide()
        console.log(err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }
}
