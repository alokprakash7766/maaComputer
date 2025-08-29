import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ sessionStorage से data read करें
    this.user = {
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      phone: sessionStorage.getItem("phone"),       // ✅ add
      address: sessionStorage.getItem("address"),   // ✅ add
      userType: sessionStorage.getItem("userType"),
      isLogged: sessionStorage.getItem("isLogged"),
      createdAt: sessionStorage.getItem("createdAt") // ✅ add
    };
  }

  // 🕒 date format
  get formattedDate(): string {
    return this.user?.createdAt ? new Date(Number(this.user.createdAt)).toLocaleString() : '';
  }

}
