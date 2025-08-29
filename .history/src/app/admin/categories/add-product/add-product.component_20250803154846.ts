import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Product } from '../../../shared/models/addProduct/add-product.model';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
    RouterLink
    
  ],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
    // this.categoryForm = this.fb.group({
    //   name: ['', Validators.required],
    //   company: ['', Validators.required],
    //   price: ['', [Validators.required, Validators.min(1)]],
    //   warranty: ['', [Validators.required, Validators.min(0)]],
    //   description: ['', Validators.required],
    //   imageUrl: ['']
    // });
  }



selectedFile: any


 uploadFile(event: any) {
    this.selectedFile = event.target.files[0]
  }


 submitCategory() {
  if (this.productForm.invalid) return;

  this.spinner.show();

  this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
    next: (res: any) => {
      const product: Product = {
        ...this.Form.value,
        imageUrl: res.secure_url,
        createdAt: serverTimestamp()
      };

      this.categoryService.addCategory(product)
        .then(() => {
          this.spinner.hide();
          this.toastr.success('Category saved successfully!');
          this.categoryForm.reset();
          this.router.navigateByUrl("/admin/update/category")
        })
        .catch((error) => {
          this.spinner.hide();
          this.toastr.error('Error saving category!');
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
