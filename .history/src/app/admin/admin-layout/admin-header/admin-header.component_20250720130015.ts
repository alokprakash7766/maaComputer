import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Remove auth token or login details
    localStorage.removeItem('adminToken');  // ya jo bhi key hai
    // Redirect to login page
    this.router.navigate(['/admin/adminLogin']);
  }
 }
