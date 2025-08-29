import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../shared/models/category/category.model';

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

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryService: CategoryService // 🔹 Injected service
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

  submitCategory() {
    if (this.categoryForm.invalid) return;

    const category: Category = {
      ...this.categoryForm.value,
      createdAt: new Date()
    };

    this.spinner.show();

    this.categoryService.addCategory(category)
      .then(() => {
        this.spinner.hide();
        this.toastr.success('Category saved in Firebase!');
        this.categoryForm.reset();
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error('Error saving category!');
        console.error(error);
      });
  }
}
