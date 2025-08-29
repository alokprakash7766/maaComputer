import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {
  billings: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // ✅ check login status

    const billingsRef = collection(this.firestore, 'billings');
    collectionData(billingsRef, { idField: 'id' }).subscribe((data) => {
      this.billings = data;
    });
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
