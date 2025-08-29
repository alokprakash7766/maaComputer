import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { AddServicesService } from '../../../services/services/services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class EditItemComponent implements OnInit {
  type!: string;
  id!: string;

  category: any = {};
  product: any = {};
  service: any = {};

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: AddProductService,
    private serviceService: AddServicesService
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.type === 'category') {
      this.categoryService.getSingleCategory(this.id).then(data => {
        this.category = data;
        this.loading = false;
      });
    } 
    else if (this.type === 'product') {
      this.productService.getSingleProduct(this.id).then(data => {
        this.product = data;
        this.loading = false;
      });
    } 
    else if (this.type === 'service') {
      this.serviceService.getSingleService(this.id).then(data => {
        this.service = data;
        this.loading = false;
      });
    }
  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.category).then(() => alert('Category updated'));
  }

  updateProduct() {
    this.productService.updateProduct(this.id, this.product).then(() => alert('Product updated'));
  }

  updateService() {
    this.serviceService.updateService(this.id, this.service).then(() => alert('Service updated'));
  }
}
