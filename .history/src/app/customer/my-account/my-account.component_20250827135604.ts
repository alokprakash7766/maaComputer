import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { MyAccountService } from '../../services/myAccount/my-account.service';

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

  profileForm = { name: '', phone: '', address: '' };
  passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private myAccountService: MyAccountService
  ) {}

  ngOnInit() {
    this.userData = {
      uid: sessionStorage.getItem("uid"),
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      phone: sessionStorage.getItem("phone"),
      address: sessionStorage.getItem("address"),
      createdAt: sessionStorage.getItem("createdAt"),
      userType: sessionStorage.getItem("userType"),
      isLogged: sessionStorage.getItem("isLogged")
    };

    this.profileForm.name = this.userData.name || '';
    this.profileForm.phone = this.userData.phone || '';
    this.profileForm.address = this.userData.address || '';

    this.ordersService.getOrders().subscribe(data => {
      this.orders = data.filter(o => o.email === this.userData.email);
    });
  }

  async updateProfile() {
    try {
      await this.myAccountService.updateProfile(this.userData.uid, {
        name: this.profileForm.name,
        phone: this.profileForm.phone,
        address: this.profileForm.address
      });

      sessionStorage.setItem("name", this.profileForm.name);
      sessionStorage.setItem("phone", this.profileForm.phone);
      sessionStorage.setItem("address", this.profileForm.address);

      alert("✅ Profile updated in Firebase & session!");
    } catch (err) {
      alert("❌ Error updating profile: " + err);
    }
  }

  async changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert("❌ New Password and Confirm Password do not match!");
      return;
    }

    try {
      await this.myAccountService.changePassword(this.passwordForm.newPassword);
      alert("✅ Password updated successfully in Firebase Auth!");
      this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
    } catch (err) {
      alert("❌ Error changing password: " + err);
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
