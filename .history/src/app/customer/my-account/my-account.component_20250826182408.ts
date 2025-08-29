import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userData: any = null;

  constructor(private authService: AuthService,
    private router: Router
  ) { }





  ngOnInit() {
    // ✅ sessionStorage से data load करो
    if (this.authService.getIsLoggedIn() === "true") {
      this.userData = {
        name: sessionStorage.getItem("name"),
        email: sessionStorage.getItem("email"),
        phone: sessionStorage.getItem("phone"),
        address: sessionStorage.getItem("address"),
        createdAt: sessionStorage.getItem("createdAt"),
        userType: sessionStorage.getItem("userType"),
        isLogged: sessionStorage.getItem("isLogged")
      };
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
