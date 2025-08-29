import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private registerService: RegisterService,
     private spinner: NgxSpinnerService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Password match validator
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submit() {
    this.spinner.show();
  if (this.userForm.invalid) {
    this.toastr.error('Please fill all fields correctly', 'Error');
    this.spinner.hide();
    return;
  }

  const { name, email, password, phone, address, confirmPassword } = this.userForm.value;

  if (password !== confirmPassword) {
    this.toastr.error('Passwords do not match', 'Error');
    return;
  }

  const newUser = {
    name,
    email,
    password,
    phone,
    address,
    role: 'customer',
    createdAt: new Date()
  };

  //Firebase Firestore sent to firebase
  this.registerService.registerUser(newUser)
    .then(() => {
      this.toastr.success('Registration Successful', 'Success');
      this.router.navigateByUrl('/login');
    })
    .catch(error => {
      console.error('Firebase Error:', error);
      this.toastr.error('Registration failed', 'Error');
    });
}

}
