import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userData: any = null;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.uid) {
      this.userService.getUserById(currentUser.uid).subscribe(user => {
        this.userData = user;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
