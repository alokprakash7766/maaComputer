import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
 
    private userService: UserService

  ) { }


  login = {
    email: '',
    password: ''
  }


  submit() {
    this.userService.login(this.login.email, this.login.password)
  }
}
