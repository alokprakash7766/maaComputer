import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminHeaderComponent, AdminFooterComponent,AdminLoginComponent,DashboardComponent,CategoriesComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
