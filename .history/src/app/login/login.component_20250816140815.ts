import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';
import Swal from 'sweetalert2';
import { Auth, updatePassword } from '@angular/fire/auth';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  step: 'login' | 'verifyEmailPhone' | 'resetPassword' = 'login';

  login = { email: '', password: '' };
  verify = { email: '', mobile: '' };
  reset = { newPassword: '', confirmPassword: '' };
  verifiedUid: string = '';

  // ✅ inject() ka use
  private firestore: Firestore = inject(Firestore);

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private auth: Auth
  ) { }

  submit() {
    this.userService.login(this.login.email, this.login.password);
  }
  
}
