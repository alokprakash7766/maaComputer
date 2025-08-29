import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner'
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,NgxSpinnerModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  keyboardForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.keyboardForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      connectivity: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    if (this.keyboardForm.invalid || !this.selectedImage) {
      alert("Please fill all fields and select an image.");
      return;
    }

    this.spinner.show();

    const formData = new FormData();
    formData.append('name', this.keyboardForm.get('name')?.value);
    formData.append('brand', this.keyboardForm.get('brand')?.value);
    formData.append('type', this.keyboardForm.get('type')?.value);
    formData.append('connectivity', this.keyboardForm.get('connectivity')?.value);
    formData.append('price', this.keyboardForm.get('price')?.value);
    formData.append('description', this.keyboardForm.get('description')?.value);
    formData.append('image', this.selectedImage);

    
    setTimeout(() => {
      this.spinner.hide();
      alert('Keyboard added successfully!');
      this.keyboardForm.reset();
      this.selectedImage = null;
    }, 2000);
  }
}
