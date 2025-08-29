import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner'; // ✅ Module bhi import kiya
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgxSpinnerModule], // ✅ Yaha add karo
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
  ) {}

  submit() {
    if (!this.login.email || !this.login.password) {
      this.toastr.error('Please fill in all fields');
      return;
    }

    this.spinner.show();
showPassword: boolean = false;
    this.userService.login(this.login.email, this.login.password).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.toastr.success('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.message || 'Login failed');
      }
    });
  }
}
