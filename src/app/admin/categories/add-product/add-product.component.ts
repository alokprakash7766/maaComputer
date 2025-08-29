import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private addProductService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      status: [true]
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (res: any) => {
          this.productForm.get('imageUrl')?.setValue(res.secure_url);
        },
        error: (err: any) => {
          console.error('Image upload error:', err);
          this.toastr.error('Image upload failed');
        }
      });
    }
  }

  submitProduct(): void {
    if (this.productForm.invalid || !this.selectedFile) {
      Swal.fire('Error', 'Please fill all required fields and upload an image.', 'error');
      return;
    }

    this.spinner.show();

    const product: Product = {
      ...this.productForm.value,
      createdAt: Date.now(),
      status: true
    };

    this.addProductService.addProduct(product)
      .then(() => {
        this.spinner.hide();
        this.toastr.success('Product saved successfully!');
        this.productForm.reset();
        this.router.navigateByUrl('/admin/update/category');
      })
      .catch(error => {
        this.spinner.hide();
        this.toastr.error('Error saving product!');
        console.error(error);
      });
  }
}
