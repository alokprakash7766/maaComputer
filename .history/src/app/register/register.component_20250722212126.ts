import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService) {

  }
  user: User = {}

  submit() {
    this
    this.userService.register(this.user)
  }


}
