import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  submit() {
    if (!this.login.email || !this.login.password) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    this.userService.login(this.login.email, this.login.password)
      .catch((err: any) => {
        this.spinner.hide();
        this.toastr.error(err.message || 'Login Failed', 'Error');
      });
  }
}
