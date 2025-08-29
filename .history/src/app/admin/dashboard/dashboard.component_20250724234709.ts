import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category/category.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  categories: Category[] = [];
  private firestore: Firestore = inject(Firestore);

  ngOnInit() {
    const usersRef = collection(this.firestore, 'users');
    collectionData(usersRef).subscribe((users: any[]) => {
      this.totalUsers = users.length;
    });

    const categoriesRef = collection(this.firestore, 'categories');
    collectionData(categoriesRef).subscribe((data: any[]) => {
      this.categories = data as Category[];
    });
     this.categoryService.getAllCategories().subscribe(data => {
    this.categories = data;
  });
  }
  // dashboard.component.ts


ngOnInit() {
 
}

}
