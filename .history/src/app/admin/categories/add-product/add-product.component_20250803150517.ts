import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { RouterLink, Router } from '@angular/router';

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
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private productService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  submitProduct(): void {
    if (this.productForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please complete the form and select an image');
      return;
    }

    this.spinner.show();

    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (res: any) => {
        const product: Product = {
          ...this.productForm.value,
          imageUrl: res.secure_url
        };

        this.productService.addProduct(product).then(() => {
          this.spinner.hide();
          this.toastr.success('Product added successfully!');
          this.productForm.reset();
          this.selectedFile = null;
          this.router.navigateByUrl("/admin/update/product");
        }).catch((err) => {
          this.spinner.hide();
          this.toastr.error('Error saving product!');
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
