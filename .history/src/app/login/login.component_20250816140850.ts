import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {  NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';


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


  constructor(
    private userService: UserService,

  ) { }

  submit() {
    this.userService.login(this.login.email, this.login.password);
  }

}
