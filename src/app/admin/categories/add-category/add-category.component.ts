import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../shared/models/category/category.model';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Router, RouterLink } from '@angular/router';

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
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      warranty: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }



selectedFile: any


 uploadFile(event: any) {
    this.selectedFile = event.target.files[0]
  }


 submitCategory() {
  if (this.categoryForm.invalid) return;

  this.spinner.show();

  this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
    next: (res: any) => {
      const category: Category = {
        ...this.categoryForm.value,
        imageUrl: res.secure_url,
        createdAt: serverTimestamp()
      };

      this.categoryService.addCategory(category)
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
