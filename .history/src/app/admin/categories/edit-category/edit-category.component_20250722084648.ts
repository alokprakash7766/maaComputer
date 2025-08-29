import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  editForm!: FormGroup;
  categoryId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadCategoryData();
  }

  initForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      company: [''],
      warranty: [0],
      imageUrl: ['']
    });
  }

  async loadCategoryData() {
    const docRef = doc(this.firestore, 'categories', this.categoryId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.editForm.patchValue(docSnap.data());
    } else {
      this.toastr.error('Category not found!');
      this.router.navigate(['/admin/categories']);
    }
  }

  async save() {
    if (this.editForm.invalid) return;
    try {
      const docRef = doc(this.firestore, 'categories', this.categoryId);
      await updateDoc(docRef, this.editForm.value);
      this.toastr.success('Category updated successfully');
      this.router.navigate(['/admin/categories']);
    } catch (error) {
      console.error(error);
      this.toastr.error('Failed to update category');
    }
  }
}
