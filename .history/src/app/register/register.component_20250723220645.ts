import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }

    const user: User = this.registerForm.value;

    this.spinner.show();
    this.userService.register(user).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('Registered successfully!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Registration failed!');
      }
    });
  }
}
