import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  logout(): void {
    this.authService.clear();
    this.toastr.success("Logout Successful");
    this.router.navigateByUrl("/login");
  }

  checkLogin(): void {
    const loggedIn = this.authService.getIsLoggedIn();
    const email = this.authService.getEmail();

    if (loggedIn === "true" && email !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}
