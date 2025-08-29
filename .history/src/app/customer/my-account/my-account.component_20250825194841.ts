import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: any = null;
  activeTab: string = 'profile'; // ✅ Default tab = Profile

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      phone: sessionStorage.getItem("phone"),
      address: sessionStorage.getItem("address"),
      userType: sessionStorage.getItem("userType"),
      isLogged: sessionStorage.getItem("isLogged"),
      createdAt: sessionStorage.getItem("createdAt")
    };
  }

  get formattedDate(): string {
    return this.user?.createdAt ? new Date(Number(this.user.createdAt)).toLocaleString() : '';
  }

  logout() {
    this.authService.clear();
    this.router.navigateByUrl("/login");
  }
}
