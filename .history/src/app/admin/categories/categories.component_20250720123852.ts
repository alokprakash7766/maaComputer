import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from '../admin-layout/admin-footer/admin-footer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ,
    RouterModule,
    AdminHeaderComponent,
    AdminFooterComponent,
    DashboardComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UpdateCategoryComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent { }
