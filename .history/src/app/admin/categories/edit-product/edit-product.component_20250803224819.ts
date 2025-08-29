import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { AddProductService } from '../../../services/addProduct/add-product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: any;
  productForm!: FormGroup;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private productService: AddProductService,
    private cloudinaryService: CloudinaryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.getSingleProduct();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      imageUrl: ['']
    });
  }

  getSingleProduct() {
    this.productService.getSingleProduct(this.id).subscribe(
      (res: any) => {
        this.productForm.patchValue(res);
      },
      (err: any) => {
        console.error(err);
        this.toastr.error('Failed to load product');
      }
    );
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    this.spinner.show();
    const formData = this.productForm.value;

    const updateProductData = (imageUrl?: string) => {
      if (imageUrl) {
        formData.imageUrl = imageUrl;
      }

      this.productService.updateProduct(this.id, formData).then(() => {
        this.spinner.hide();
        this.toastr.success("Product Updated");
        this.router.navigateByUrl("/admin/update/product");
      }).catch(err => {
        this.spinner.hide();
        this.toastr.error("Update failed");
        console.error(err);
      });
    };

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        (res: any) => updateProductData(res.secure_url),
        (err: any) => {
          this.spinner.hide();
          this.toastr.error("Image upload failed");
          console.error(err);
        }
      );
    } else {
      updateProductData();
    }
  }
}
