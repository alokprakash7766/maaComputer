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
  services: Services[] = []; // services list

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: AddProductService,
    private serviceService: AddServicesService // service ka CRUD
  ) { }

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
      next: (data) => this.services = data,
      error: (err) => console.error('Error fetching services:', err)
    });
  }

  // ------------------ Category ------------------
  onEdit(id: string) {
    this.router.navigate(['/admin/edit-category', id]);
  }

  deleteCategory(id: string) {
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

  deleteProduct(id: string) {
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
  editService(id: string) {
    this.router.navigate(['/admin/edit-service', id]);
  }

  deleteService(id: string) {
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
}
