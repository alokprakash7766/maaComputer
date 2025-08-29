import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Product } from 'src/app/shared/models/addProduct/add-product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  selectedImage!: File;

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.productForm.patchValue({ image: file.name });
    }
  }

  submitProduct(): void {
    this.spinner.show();

    if (this.productForm.invalid) {
      this.spinner.hide();
      Swal.fire('Error', 'Please fill out all required fields correctly.', 'error');
      return;
    }

    const product: Product = this.productForm.value;

    this.cloudinaryService.uploadImage(this.selectedImage).subscribe({
      next: (imageUrl: string) => {
        product.image = imageUrl;

        this.addProductService.addProduct(product)
          .then(() => {
            this.spinner.hide();
            Swal.fire('Success', 'Product added successfully!', 'success');
            this.productForm.reset();
          })
          .catch((err) => {
            this.spinner.hide();
            Swal.fire('Error', 'Product upload failed.', 'error');
            console.error(err);
          });
      },
      error: (error: any) => {
        this.spinner.hide();
        Swal.fire('Error', 'Image upload failed.', 'error');
        console.error(error);
      }
    });
  }
}
