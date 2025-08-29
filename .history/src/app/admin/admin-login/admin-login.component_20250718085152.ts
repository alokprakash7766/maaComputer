import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxSpinnerModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private toastr: ToastrService,private spinner: NgxSpinnerService) {}

  onLogin() {
    // Dummy credentials for admin
    const dummyAdmin = {
      email: 'admin@admin.com',
      password: 'admin123'
    };

    if (
      this.admin.email === dummyAdmin.email &&
      this.admin.password === dummyAdmin.password
    ) {
      this.toastr.success('Login Successful', 'Welcome Admin!');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.toastr.error('Invalid Credentials', 'Login Failed');
    }
  }
}
