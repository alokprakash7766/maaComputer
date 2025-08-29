import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
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
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  submitCategory() {
    if (this.categoryForm.invalid) return;

    this.spinner.show();

    // Simulating backend call
    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Category added successfully!');
      this.categoryForm.reset();
    }, 1000);
  }
}
