import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from '../admin-layout/admin-footer/admin-footer.component';

@Component({
  selector: 'app-categories',
  imports: [RouterModule, AdminHeaderComponent, AdminFooterComponent,das],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
