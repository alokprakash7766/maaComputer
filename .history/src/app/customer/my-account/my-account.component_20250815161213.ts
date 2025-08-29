import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service'; // apne path ke hisaab se adjust karein
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userData: any = null; // ✅ declare kiya to avoid error
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const uid = this.authService.getCurrentUserId();
    if (uid) {
      this.userService.getUserById(uid).subscribe((data: any) => {
        this.userData = data;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
