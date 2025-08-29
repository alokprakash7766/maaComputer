import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) {

  }

  logout() {
    this.spinner.show()
    this.authService.clear()
    this.toastr.success("Logout Successfull")
    this.router.navigateByUrl("/login")
  }


}
