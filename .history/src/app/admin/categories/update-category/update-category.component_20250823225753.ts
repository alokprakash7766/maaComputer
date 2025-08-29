import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../shared/models/category/category.model';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { AddServicesService } from '../../../services/services/services.service';
import { Services } from '../../../shared/models/services/services.model';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../../services/weddingCard/wedding-card.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  servicesList: Services[] = [];
   weddingCardsList: WeddingCard[] = [];
  loading = true;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: AddProductService,
    private serviceService: AddServicesService,
     private weddingCardService: WeddingCardService
  ) {}

  ngOnInit(): void {
    // Load categories
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories:', err)
    });

    // Load products
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });

    // Load services
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.servicesList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.loading = false;
      }
    });
     // Wedding Cards
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (data) => this.weddingCardsList = data,
      error: (err) => console.error('Error fetching wedding cards:', err)
    });
  }

  // ------------------ Category ------------------
  onEdit(id?: string) {
    if (!id) return;
    this.router.navigate(['/admin/edit-category', id]);
  }

  deleteCategory(id?: string) {
    if (!id) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).then(() => {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        }).catch((err) => console.error(err));
      }
    });
  }

  // ------------------ Products ------------------
  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter((p: Product) => p.categoryId === categoryId);
  }

  deleteProduct(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).then(() => {
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        }).catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to delete product.', 'error');
        });
      }
    });
  }

  // ------------------ Services ------------------
  editService(id?: string) {
    if (!id) return;
    this.router.navigate(['/admin/edit-service', id]);
  }

  deleteService(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This service will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.deleteService(id).then(() => {
          Swal.fire('Deleted!', 'Service has been deleted.', 'success');
        }).catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to delete service.', 'error');
        });
      }
    });
  }

   // Wedding Card actions
  editWeddingCard(id?: string) {
    if (!id) return;
    this.router.navigate(['/admin/edit-wedding/card', id]);
  }
  
  deleteWeddingCard(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This wedding card will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.weddingCardService.deleteWeddingCard(id).then(() => {
          Swal.fire('Deleted!', 'Wedding card has been deleted.', 'success');
        }).catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to delete wedding card.', 'error');
        });
      }
    });
  }
}


