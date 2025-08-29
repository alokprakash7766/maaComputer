import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ProductService } from '../../../services/addProduct/add-product.service';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
    RouterLink
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
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      warranty: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['']
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

        this.productService.addProduct(product)
          .then(() => {
            this.spinner.hide();
            this.toastr.success('Product saved successfully!');
            this.productForm.reset();
            this.router.navigateByUrl('/admin/update/product');
          })
          .catch((err) => {
            this.spinner.hide();
            this.toastr.error('Failed to save product!');
            console.error(err);
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
