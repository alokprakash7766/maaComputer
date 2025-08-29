import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) { }

  async submit() {
    if (!this.login.email || !this.login.password) {
      this.toastr.warning("Please fill all fields", "Validation");
      return;
    }

    try {
      this.spinner.show();

      const res: any = await this.userService.login(this.login.email, this.login.password);

      if (res && res.success) {
        // ✅ Session data save
        sessionStorage.setItem("name", res.data.name);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("phone", res.data.phone);
        sessionStorage.setItem("address", res.data.address);
        sessionStorage.setItem("createdAt", res.data.createdAt);
        sessionStorage.setItem("userType", res.data.userType);
        sessionStorage.setItem("isLogged", "true");

        this.toastr.success("Login successful", "Success");
        this.router.navigate(['/my-account']);
      } else {
        this.toastr.error(res.message || "Invalid email or password", "Error");
      }
    } catch (err) {
      console.error(err);
      this.toastr.error("Something went wrong", "Error");
    } finally {
      this.spinner.hide();
    }
  }
}
