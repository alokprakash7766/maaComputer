import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userData: any = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        const userRef = doc(this.firestore, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          this.userData = userSnap.data();
        } else {
          this.toastr.error('User data not found!');
        }
      } else {
        this.toastr.error('No user is logged in!');
      }
    } catch (err) {
      console.error(err);
      this.toastr.error('Error fetching user details');
    }
    this.spinner.hide();
  }
}
