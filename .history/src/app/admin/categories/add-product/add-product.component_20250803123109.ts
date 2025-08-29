import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../../services/add-product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: AddProductServic
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value)
        .then(() => {
          alert('✅ Product added successfully!');
          this.productForm.reset();
        })
        .catch(error => {
          console.error('❌ Error:', error);
        });
    }
  }
}
