import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { serverTimestamp } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router: Router,
    private toastr: ToastrService,
    private addProductService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private spinner: NgxSpinnerService
  ) { }

ngOnInit(): void {
  this.productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    image: ['', Validators.required],
    status: [true]
  });
}


  selectedFile: File | null = null;

uploadFile(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log("Selected file:", this.selectedFile);
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
    this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
      (res: any) => {
        const product: Product = {
          ...this.productForm.value,
          imageUrl: res.secure_url,
          createdAt: serverTimestamp()
        };

        this.addProductService.addProduct(product)
          .then(() => {
            this.spinner.hide();
            this.toastr.success('Product saved successfully!');
            this.productForm.reset();
            this.router.navigateByUrl("/admin/update/category");
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error('Error saving product!');
            console.error(error);
          });
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Image upload failed!');
        console.error(err);
      }
    );

  }
}
