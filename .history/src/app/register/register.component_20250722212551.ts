import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  };

  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  async submit() {
    if (!this.user.name || !this.user.email || !this.user.phone || !this.user.address || !this.user.password) {
      this.toastr.error('All fields are required', 'Validation Failed');
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Validation Failed');
      return;
    }

    this.spinner.show();
    try {
      await this.userService.register(this.user);
      this.toastr.success('Registration Successful', 'Success');
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.toastr.error('Registration Failed', 'Error');
      console.error('Registration error:', error);
    } finally {
      this.spinner.hide();
    }
  }
}
