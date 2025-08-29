import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';

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
