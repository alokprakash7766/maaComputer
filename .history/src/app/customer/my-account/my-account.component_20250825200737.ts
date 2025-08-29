import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MyAccountService } from '../../services/myAccount/my-account.service';
import { FormModule } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  imports:[FOrmM],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any = {};
  orders: any[] = [];

  constructor(private accountService: MyAccountService, private auth: Auth) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;

      // ✅ User Profile Load
      this.user = await this.accountService.getUserProfile(uid);

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
}
