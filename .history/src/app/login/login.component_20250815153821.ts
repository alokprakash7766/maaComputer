import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true, // if using standalone components
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // ✅ fixed
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

    this.userService.login(this.login.email, this.login.password).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.toastr.success('Login successful');
        this.router.navigate(['/dashboard']); // change route as needed
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.message || 'Login failed');
      }
    });
  }
}
