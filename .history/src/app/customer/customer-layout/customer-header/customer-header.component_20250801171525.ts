import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-header',
  imports: [RouterLink],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent {
      constructor(private router: Router) {}
  handleUserIconClick() {
    const user = localStorage.getItem('user');
    
    if (user) {
      // ✅ User is logged in → Logout
      Swal.fire({
        title: 'Logout?',
        text: 'Do you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user');
          Swal.fire('Logged out', '', 'success');
          this.router.navigate(['/login']);
        }
      });
    } else {
      // ❌ User not logged in → Go to register/login
      this.router.navigate(['/register']);
    }
  }

}
