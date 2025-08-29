import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../shared/models/category/category.model';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { Product } from '../../shared/models/addProduct/add-product.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { Services } from '../../shared/models/services/services.model';

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
  products: Product[] = [];
    weddingCards: WeddingCard[] = [];
    services: Services[] = [];
    

  private firestore: Firestore = inject(Firestore);
  private categoryService = inject(CategoryService);
  private productService = inject(AddProductService);
  private weddingCardService = inject(WeddingCardService);
  private servicesService = inject(AddServicesService);
  
  ngOnInit() {
    const usersRef = collection(this.firestore, 'users');
    collectionData(usersRef).subscribe((users: any[]) => {
      this.totalUsers = users.length;
    });

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    // Subscribe to wedding cards
    this.weddingCardService.getAllWeddingCards().subscribe((data: WeddingCard[]) => {
      this.weddingCards = data;
    });
    this.services.getAllservices().subscribe((data: Services[]) => {
      this.services = data;
    });
  }
}
