import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddProductService } from '../services/add-product.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: AddProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: 'Your product was added successfully!',
            confirmButtonColor: '#3085d6'
          });
          this.productForm.reset();
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add product.',
            confirmButtonColor: '#d33'
          });
          console.error('Error:', error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields!',
        confirmButtonColor: '#f6c23e'
      });
    }
  }
}
