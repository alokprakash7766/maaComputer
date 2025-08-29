import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {
  billings: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const billingsRef = collection(this.firestore, 'billings');
    collectionData(billingsRef, { idField: 'id' }).subscribe((data) => {
      this.billings = data;
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // ya user token
  }

  // Optional: Delete a billing entry
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
