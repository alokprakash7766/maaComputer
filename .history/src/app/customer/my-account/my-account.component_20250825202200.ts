import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../shared/auth/auth.service';
import { MyAccountService } from '../../services/myAccount/my-account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any = {};
  orders: any[] = [];

  activeTab: string = 'profile';
  formattedDate: string = '';

  constructor(
    private accountService: MyAccountService,
    private auth: Auth,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;

      // ✅ User Profile Load
      this.user = await this.accountService.getUserProfile(uid);

      if (this.user?.createdAt) {
        this.formattedDate = new Date(this.user.createdAt).toLocaleDateString();
      }

      // ✅ Orders Load
      this.orders = await this.accountService.getUserOrders(uid);
    }
  }

  // ✅ Profile Update Function
  async updateSettings() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      await this.accountService.updateUserProfile(currentUser.uid, {
        name: this.user.name,
        address: this.user.address,
        phone: this.user.phone
      });
      alert('Profile Updated Successfully ✅');
    }
  }

  // ✅ Logout Function
  logout() {
    this.auth.signOut().then(() => {
      this.authService.clear();
      window.location.href = '/login';
    });
  }
}
