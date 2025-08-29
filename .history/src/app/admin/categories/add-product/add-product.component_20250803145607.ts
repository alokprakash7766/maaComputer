import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { Product } from '../../../shared/models/product/product.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase.config'; // ✅ Your Firebase storage instance

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: AddProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid && this.selectedFile) {
      const file = this.selectedFile;
      const filePath = `product_images/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const productData: Product = {
          ...this.productForm.value,
          imageUrl: downloadURL
        };

        await this.productService.addProduct(productData);

        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: 'Product with image added successfully!',
          confirmButtonColor: '#3085d6'
        });

        this.productForm.reset();
        this.selectedFile = null;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Image upload failed!',
          confirmButtonColor: '#d33'
        });
        console.error('Upload Error:', error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: 'Please fill all fields and choose an image!',
        confirmButtonColor: '#f6c23e'
      });
    }
  }
}
