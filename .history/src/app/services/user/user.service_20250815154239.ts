import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, doc, DocumentData, Firestore, collection, setDoc, getDoc } from '@angular/fire/firestore';
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

  constructor(
  private db: Firestore,
  private auth: Auth,
  private toastr: ToastrService,
  private spinner: NgxSpinnerService,
  private router: Router,
  private authService: AuthService
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
          this.toastr.error(err)
        }
      )
    },
      (err: any) => {
        this.spinner.hide()
        console.log(err);
        this.toastr.error(err)
      }
    )
  }
  // login
<!-- Spinner -->
<ngx-spinner size="medium" color="#00E5FF" type="ball-fussion" [fullScreen]="true"></ngx-spinner>

<!-- Login Section Start -->
<div class="container py-5 loginLogin bg-light">
  <div class="row justify-content-center">
    <div class="col-12 text-center mb-4">
      <h1
        class="bg-white login text-primary px-4 py-2 w-auto animate slideInDown rounded shadow-lg border border-primary border-2 d-inline-block">
        Login
      </h1>
    </div>

    <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
      <form
        #loginForm="ngForm"
        (ngSubmit)="submit()"
        class="p-4 p-md-5 rounded bg-white shadow-lg border-top border-4 border-primary animated-box">

        <div class="row g-4">
          <!-- Email -->
          <div class="col-12">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                name="email"
                [(ngModel)]="login.email"
                required
                email
                #emailField="ngModel" />
              <label for="email">Email</label>
            </div>
            <!-- Email Errors -->
            <div *ngIf="emailField.invalid && emailField.touched" class="text-danger small mt-1">
              <div *ngIf="emailField.errors?.['required']">Email is required.</div>
              <div *ngIf="emailField.errors?.['email']">Enter a valid email address.</div>
            </div>
          </div>

          <!-- Password -->
          <div class="col-12">
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                name="password"
                [(ngModel)]="login.password"
                required
                minlength="6"
                #passwordField="ngModel" />
              <label for="password">Password</label>
            </div>
            <!-- Password Errors -->
            <div *ngIf="passwordField.invalid && passwordField.touched" class="text-danger small mt-1">
              <div *ngIf="passwordField.errors?.['required']">Password is required.</div>
              <div *ngIf="passwordField.errors?.['minlength']">Password must be at least 6 characters.</div>
            </div>
          </div>

          <!-- Sign In Button -->
          <div class="col-12">
            <button
              class="btn btn-primary w-100 py-2 fw-bold shadow-sm"
              type="submit"
              [disabled]="loginForm.invalid">
              Sign In
            </button>
          </div>

          <!-- Register Link -->
          <div class="col-12 text-center mt-3">
            <span>Don't have an account?</span>
            <span
              routerLink="/register"
              class="text-decoration-underline text-primary"
              style="cursor: pointer; font-weight: 500;">
              Register
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<!-- Login Section End -->


}
