import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { NgIf, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent {
  billings: any[] = [];
  newBilling = {
    name: '',
    mobile: '',
    address: '',
    location: '',
    pincode: ''
  };

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const billingsRef = collection(this.firestore, 'billings');
    collectionData(billingsRef, { idField: 'id' }).subscribe((data) => {
      this.billings = data;
    });
  }

  async addBilling() {
    const billingsRef = collection(this.firestore, 'billings');
    await addDoc(billingsRef, this.newBilling);
    Swal.fire('Success', 'Billing saved successfully!', 'success');
    this.newBilling = {
      name: '',
      mobile: '',
      address: '',
      location: '',
      pincode: ''
    };
  }

  async deleteBilling(id: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    });

    if (result.isConfirmed) {
      await deleteDoc(doc(this.firestore, 'billings', id));
      Swal.fire('Deleted!', '', 'success');
    }
  }
}
