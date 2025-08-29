import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { AddProductService } from '../../../services/addProduct/add-product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: any;
  productForm!: FormGroup;
  selectedFile: any;

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
    this.id = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.getSingleProduct();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      warranty: [0],
      description: [''],
      imageUrl: ['']
    });
  }

  getSingleProduct() {
    this.addProductService.getSingleProduct(this.id).then((res: any) => {
      this.productForm.patchValue(res);
    }).catch((err) => {
      console.error('Failed to load product', err);
    });
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    this.spinner.show();
    const formData = this.productForm.value;

    const updateData = (imageUrl?: string) => {
      if (imageUrl) {
        formData.imageUrl = imageUrl;
      }

      this.addProductService.updateProduct(this.id, formData).then(() => {
        this.spinner.hide();
        this.toastr.success("Product Updated");
        this.router.navigateByUrl("/admin/update/product");
      }).catch(err => {
        this.spinner.hide();
        this.toastr.error("Update Failed");
        console.error(err);
      });
    };

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        (res: any) => updateData(res.secure_url),
        (err: any) => {
          this.spinner.hide();
          this.toastr.error("Image Upload Failed");
          console.error(err);
        }
      );
    } else {
      updateData();
    }
  }
}
