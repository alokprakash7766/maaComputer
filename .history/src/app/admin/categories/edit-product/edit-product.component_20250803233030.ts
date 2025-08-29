import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { AddProductService } from '../../../services/addProduct/add-product.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id!: string;
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private addProductService: AddProductService,
    private cloudinaryService: CloudinaryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.initForm();
    if (this.id) this.loadProduct();
  }

  initForm() {
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

  loadProduct() {
    this.addProductService.getSingleProduct(this.id).then((product: Product) => {
      if (product) {
        this.productForm.patchValue(product);
      } else {
        this.toastr.error("Product not found");
      }
    }).catch(error => {
      this.toastr.error("Error loading product");
      console.error("Load product error:", error);
    });
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    this.spinner.show();
    const formData = this.productForm.value;

    const updateProductData = (imageUrl?: string) => {
      if (imageUrl) formData.imageUrl = imageUrl;

      this.addProductService.updateProduct(this.id, formData)
        .then(() => {
          this.spinner.hide();
          this.toastr.success("Product updated successfully");
          this.router.navigateByUrl("/admin/update/category");
        })
        .catch(err => {
          this.spinner.hide();
          this.toastr.error("Product update failed");
          console.error("Update error:", err);
        });
    };

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
        next: (res: any) => updateProductData(res.secure_url),
        error: (err: any) => {
          this.spinner.hide();
          this.toastr.error("Image upload failed");
          console.error("Upload error:", err);
        }
      });
    } else {
      updateProductData();
    }
  }
}
