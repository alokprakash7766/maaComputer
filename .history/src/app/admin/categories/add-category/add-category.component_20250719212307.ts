import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../shared/models/category/category.model';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule
  ],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  selectedFile: any;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private cloudinaryService: CloudinaryService
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

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submitCategory() {
    if (this.categoryForm.invalid || !this.selectedFile) {
      this.toastr.error('Please fill the form and select an image.');
      return;
    }

    this.spinner.show();

    this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
      (res: any) => {
        this.categoryForm.patchValue({ imageUrl: res.secure_url });

        const category: Category = {
          ...this.categoryForm.value,
          createdAt: serverTimestamp()
        };

        this.categoryService.addCategory(category)
          .then(() => {
            this.spinner.hide();
            this.toastr.success('Category saved in Firebase!');
            this.categoryForm.reset();
            this.imagePreview = null;
            this.selectedFile = null;
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error('Error saving category!');
            console.error(error);
          });
      },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error("Something went wrong");
        console.log(err);
      }
    );
  }
}
