import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  user = {
    name: "ALOK KUMAR",
    email: "ak2@gmail.com",
    phone: "9065834810",
    address: "VILL- MUNGIYATHI BIGHA PO - KASHIPUR PS- BARUN DIST- AURANGABAD BIHAR 824112",
    createdAt: 1753437537820
  };

  // 🕒 Convert createdAt timestamp into Date format
  get formattedDate(): string {
    return new Date(this.user.createdAt).toLocaleString();
  }

}
