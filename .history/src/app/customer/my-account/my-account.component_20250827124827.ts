import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../shared/auth/auth.service';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class MyAccountComponent implements OnInit {
  userData: any = null;
  activeTab: string = 'profile';
  orders: Orders[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
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

      //  Load orders only for this user (email-based filter)
      this.ordersService.getOrders().subscribe(data => {
        this.orders = data.filter(o => o.email === this.userData.email);
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
