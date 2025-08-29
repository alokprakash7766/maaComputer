import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header/admin-header.component';

@Component({
  selector: 'app-categories',
  imports: [RouterModule, AdminHeaderComponent, Admin],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
