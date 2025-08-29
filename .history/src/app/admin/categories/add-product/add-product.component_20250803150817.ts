import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedImageFile!: File;
  imageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: AddProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      imageUrl: [''] // Store URL here
    });
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.productForm.invalid || !this.selectedImageFile) {
      Swal.fire('Error', 'Please fill all fields and upload an image', 'error');
      return;
    }

    try {
      const filePath = `products/${Date.now()}_${this.selectedImageFile.name}`;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, this.selectedImageFile);
      this.imageUrl = await getDownloadURL(storageRef);

      const productData = {
        ...this.productForm.value,
        imageUrl: this.imageUrl
      };

      await this.productService.addProduct(productData);
      Swal.fire('Success', 'Product added successfully', 'success');
      this.productForm.reset();
    } catch (error) {
      console.error('Upload Error:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  }
}
