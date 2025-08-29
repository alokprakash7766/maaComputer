import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { serverTimestamp } from '@angular/fire/firestore';
import { AddProductService } from '../../../services/addProduct/add-product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private addProductService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: [''],
      status: [true]
    });
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    this.spinner.show();

    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (res: any) => {
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
      error: (err) => {
        this.spinner.hide();
        this.toastr.error('Image upload failed!');
        console.error(err);
      }
    });
  }
}
