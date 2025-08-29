import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-billings',
  
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css'],
  standalone: true,
  imports: [NgIf, NgFor,FM ReactiveFormsModule]
})
export class BillingsComponent implements OnInit {
  billings: any[] = [];
  billingForm!: FormGroup;
  isLoggedInUser: boolean = false;

  constructor(private firestore: Firestore, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isLoggedInUser = !!localStorage.getItem('token');

    const billingsRef = collection(this.firestore, 'billings');
    collectionData(billingsRef, { idField: 'id' }).subscribe((data) => {
      this.billings = data;
    });

    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.billingForm.valid) {
      try {
        const billingData = this.billingForm.value;
        const billingsRef = collection(this.firestore, 'billings');
        await addDoc(billingsRef, billingData);

        Swal.fire('Success', 'Billing saved successfully!', 'success');
        this.billingForm.reset(); // ✅ Reset form after save
      } catch (error) {
        Swal.fire('Error', 'Failed to save billing.', 'error');
      }
    }
  }

  async deleteBilling(id: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This billing entry will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(this.firestore, 'billings', id));
        Swal.fire('Deleted!', 'Billing entry has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete billing.', 'error');
      }
    }
  }
}
