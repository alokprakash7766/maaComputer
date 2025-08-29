import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  name: string | null = '';
  email: string | null = '';
  userType: string | null = '';
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check login status
    const loggedStatus = this.authService.getIsLoggedIn();
    this.isLoggedIn = loggedStatus === 'true';

    if (!this.isLoggedIn) {
      this.toastr.warning('Please login first!', 'Warning');
      this.router.navigate(['/login']);
      return;
    }

    // Load account data from session
    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
    this.userType = sessionStorage.getItem('userType');
  }

  logout() {
    this.authService.clear();
    this.toastr.success('Logged out successfully!', 'Success');
    this.router.navigate(['/login']);
  }
}
