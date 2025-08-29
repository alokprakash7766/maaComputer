import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedImageFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      imageUrl: [''] // Optional, will set later after upload
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;

    try {
      let imageUrl = '';

      if (this.selectedImageFile) {
        const formData = new FormData();
        formData.append('file', this.selectedImageFile);
        formData.append('upload_preset', 'your_upload_preset'); // 👈 your Cloudinary preset

        const cloudinaryRes: any = await this.http
          .post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
          .toPromise();

        imageUrl = cloudinaryRes.secure_url;
      }

      const productData = {
        ...this.productForm.value,
        imageUrl: imageUrl
      };

      await this.productService.addProduct(productData);

      Swal.fire('Success!', 'Product added successfully!', 'success');
      this.productForm.reset();
      this.selectedImageFile = null;

    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to add product', 'error');
    }

    this.isSubmitting = false;
  }
}
