import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';
import Swal from 'sweetalert2';
import { Auth, updatePassword } from '@angular/fire/auth';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,  CommonModule NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  step: 'login' | 'verifyEmailPhone' | 'resetPassword' = 'login';

  login = { email: '', password: '' };
  verify = { email: '', mobile: '' };
  reset = { newPassword: '', confirmPassword: '' };
  verifiedUid: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private auth: Auth,
    private firestore: Firestore
  ) { }

  submit() {
    this.userService.login(this.login.email, this.login.password);
  }

  async verifyUser() {
    this.spinner.show();
    try {
      const userSnap = await getDoc(doc(this.firestore, 'users', this.verify.email)); // If you use UID instead, adjust here
      if (userSnap.exists()) {
        const userData: any = userSnap.data();
        if (userData.mobile === this.verify.mobile) {
          this.verifiedUid = userData.uid;
          this.step = 'resetPassword';
          this.toastr.success('Verification successful', 'Proceed to reset');
        } else {
          this.toastr.error('Mobile number does not match');
        }
      } else {
        this.toastr.error('Email not found');
      }
    } catch (err) {
      console.error(err);
      this.toastr.error('Verification failed');
    }
    this.spinner.hide();
  }

  async resetPassword() {
    if (this.reset.newPassword !== this.reset.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }
    try {
      const user = this.auth.currentUser;
      if (user) {
        await updatePassword(user, this.reset.newPassword);
        Swal.fire('Success', 'Password updated successfully', 'success');
        this.step = 'login';
      } else {
        this.toastr.error('No authenticated user. Please log in again.');
      }
    } catch (err: any) {
      console.error(err);
      this.toastr.error(err.message || 'Password update failed');
    }
  }
}
