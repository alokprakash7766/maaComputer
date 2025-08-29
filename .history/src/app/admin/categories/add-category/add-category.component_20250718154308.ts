import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';

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
    private toastr: ToastrService
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

    this.spinner.show();

    const formData = this.categoryForm.value;
    console.log('Submitted Category:', formData); // Debugging purpose

    // Simulate save
    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Category added successfully!');
      this.categoryForm.reset();
    }, 1000);
  }
}
