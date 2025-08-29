import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {};
  confirmPassword: string = "";

  constructor(private userService: UserService, private toastr: ToastrService) {}

  submit() {
if (!/^[0-9]{10}$/.test(String(this.user.phone || ''))) {
  this.toastr.error("Phone number must be exactly 10 digits");
  return;
}

    if (this.user.password !== this.confirmPassword) {
      this.toastr.error("Passwords do not match");
      return;
    }

    this.userService.register(this.user);
  }
}
