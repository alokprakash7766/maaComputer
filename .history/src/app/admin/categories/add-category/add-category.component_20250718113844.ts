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
  
}
