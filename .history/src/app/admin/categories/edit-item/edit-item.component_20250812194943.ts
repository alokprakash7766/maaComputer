import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { AddServicesService } from '../../../services/services/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  templateUrl: './edit-item.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class EditItemComponent implements OnInit {
  type!: string;
  id!: string;

  productForm!: FormGroup;
  serviceForm!: FormGroup;

  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: AddProductService,
    private serviceService: AddServicesService
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.id = this.route.snapshot.paramMap.get('id')!;

    // Create forms
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: [''],
      price: ['', Validators.required],
      stock: [''],
      categoryId: [''],
      categoryName: [''],
      description: [''],
      image: ['']
    });

    // Load data
    if (this.type === 'product') {
      this.productService.getProductById(this.id).subscribe(data => {
        if (data) this.productForm.patchValue(data);
      });
    } else if (this.type === 'service') {
      this.serviceService.getServiceById(this.id).subscribe(data => {
        if (data) this.serviceForm.patchValue(data);
      });
    }
  }

  // File selection
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] || null;
  }

  uploadFile(event: any) {
    this.selectedImage = event.target.files[0] || null;
  }

  // Update methods
  updateService() {
    const updatedData = { ...this.serviceForm.value };
    this.serviceService.updateService(this.id, updatedData)
      .then(() => alert('Service updated successfully'));
  }

  updateProduct() {
    const updatedData = { ...this.productForm.value };
    this.productService.updateProduct(this.id, updatedData)
      .then(() => alert('Product updated successfully'));
  }
}
