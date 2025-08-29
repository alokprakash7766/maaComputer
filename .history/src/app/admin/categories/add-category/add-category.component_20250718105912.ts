import { Component } from '@angular/core';import { FormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  selectedImage: File | null = null;
  selectedCategory = '';
  categories = [
    'Keyboard',
    'Mouse',
    'Printer',
    'Paper Goods',
    'Wedding Card',
    'Lamination Machine',
    'Paper'
  ];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required]
    });
  }

  onCategoryChange() {
    const cat = this.categoryForm.get('category')?.value;
    this.selectedCategory = cat;

    // Remove all controls except category
    Object.keys(this.categoryForm.controls).forEach(key => {
      if (key !== 'category') this.categoryForm.removeControl(key);
    });

    // Add controls based on selected category
    switch (cat) {
      case 'Keyboard':
        this.categoryForm.addControl('name', this.fb.control('', Validators.required));
        this.categoryForm.addControl('brand', this.fb.control('', Validators.required));
        this.categoryForm.addControl('type', this.fb.control('', Validators.required));
        this.categoryForm.addControl('connectivity', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control(null, Validators.required));
        this.categoryForm.addControl('description', this.fb.control('', Validators.required));
        break;

      case 'Mouse':
        this.categoryForm.addControl('name', this.fb.control('', Validators.required));
        this.categoryForm.addControl('dpi', this.fb.control('', Validators.required));
        this.categoryForm.addControl('type', this.fb.control('', Validators.required));
        this.categoryForm.addControl('connectivity', this.fb.control('', Validators.required));
        this.categoryForm.addControl('brand', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;

      case 'Printer':
        this.categoryForm.addControl('name', this.fb.control('', Validators.required));
        this.categoryForm.addControl('brand', this.fb.control('', Validators.required));
        this.categoryForm.addControl('type', this.fb.control('', Validators.required));
        this.categoryForm.addControl('connectivity', this.fb.control('', Validators.required));
        this.categoryForm.addControl('pagesPerMinute', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;

      case 'Paper Goods':
        this.categoryForm.addControl('name', this.fb.control('', Validators.required));
        this.categoryForm.addControl('size', this.fb.control('', Validators.required));
        this.categoryForm.addControl('gsm', this.fb.control('', Validators.required));
        this.categoryForm.addControl('quantity', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;

      case 'Wedding Card':
        this.categoryForm.addControl('title', this.fb.control('', Validators.required));
        this.categoryForm.addControl('style', this.fb.control('', Validators.required));
        this.categoryForm.addControl('material', this.fb.control('', Validators.required));
        this.categoryForm.addControl('color', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;

      case 'Lamination Machine':
        this.categoryForm.addControl('model', this.fb.control('', Validators.required));
        this.categoryForm.addControl('brand', this.fb.control('', Validators.required));
        this.categoryForm.addControl('widthCapacity', this.fb.control('', Validators.required));
        this.categoryForm.addControl('hotColdSupport', this.fb.control(false));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;

      case 'Paper':
        this.categoryForm.addControl('name', this.fb.control('', Validators.required));
        this.categoryForm.addControl('type', this.fb.control('', Validators.required));
        this.categoryForm.addControl('size', this.fb.control('', Validators.required));
        this.categoryForm.addControl('gsm', this.fb.control('', Validators.required));
        this.categoryForm.addControl('price', this.fb.control('', Validators.required));
        break;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedImage = file;
  }

  onSubmit() {
    if (this.categoryForm.invalid || !this.selectedImage) {
      alert('Please complete the form and upload an image.');
      return;
    }

    const formData = new FormData();
    for (let key in this.categoryForm.value) {
      formData.append(key, this.categoryForm.value[key]);
    }
    formData.append('image', this.selectedImage);

    // Simulate success without spinner
    console.log('Submitted form data:', this.categoryForm.value);
    alert(`${this.selectedCategory} added successfully!`);
    this.categoryForm.reset();
    this.selectedImage = null;
    this.selectedCategory = '';
  }
}
