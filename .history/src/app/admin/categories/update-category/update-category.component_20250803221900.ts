import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../shared/models/category/category.model';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onEdit(id: string) {

    this.router.navigate(['/admin/edit-category/:id', id]);
  }

  deleteCategory(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).then((res: any) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        },
          (err: any) => {
            console.log(err);
          }
        )
      }
    });
  }

  // -------------------------------------------------------------------
  ngOnInit() {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data;
      });
  
      this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
      });
    }
    getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => p.categoryId === categoryId);
  }
}
