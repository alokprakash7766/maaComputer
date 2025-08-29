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

@Component({
  selector: 'app-billings',
  imports
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css'],
  standalone: true
})
export class BillingsComponent implements OnInit {
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
    try {
      const billingsRef = collection(this.firestore, 'billings');
      await addDoc(billingsRef, this.newBilling);
      Swal.fire('Success', 'Billing saved successfully!', 'success');
      this.newBilling = { name: '', mobile: '', address: '', location: '', pincode: '' };
    } catch (err) {
      Swal.fire('Error', 'Failed to save billing.', 'error');
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
