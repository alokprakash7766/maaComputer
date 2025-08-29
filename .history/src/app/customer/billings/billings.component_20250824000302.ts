import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
declare var Razorpay: any;   // 👈 Razorpay declare karna zaroori hai
@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [FormsModule, RouterLink,ReactiveFormsModule, RouterModule],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})export class BillingsComponent {
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
    this.newBilling = { name: '', mobile: '', address: '', location: '', pincode: '' };
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

  // ✅ Payment integration
  proceedToPayment(bill: any) {
    const options = {
      key: 'rzp_test_xxxxxxx', // apna Razorpay test key id daalna
      amount: 50000, // 👈 paisa me amount (50000 = ₹500)
      currency: 'INR',
      name: 'Maa Computer Press',
      description: 'Order Payment',
      prefill: {
        name: bill.name,
        email: 'customer@email.com',
        contact: bill.mobile
      },
      theme: {
        color: '#3399cc'
      },
      handler: (response: any) => {
        Swal.fire('Payment Successful!', `Payment ID: ${response.razorpay_payment_id}`, 'success');
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
