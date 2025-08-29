import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  handleUserIconClick() {
    const user = localStorage.getItem('user');
    if (user) {
      // ✅ Logout logic
      this.logout();
    } else {
      // ❌ Not logged in → Go to Register
      this.router.navigate(['/register']);
    }
  }

  logout() {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        localStorage.removeItem('user');
        this.spinner.hide();
        this.toastr.success('Logout Successful');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
