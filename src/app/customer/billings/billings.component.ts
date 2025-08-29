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
import { ToastrService } from 'ngx-toastr';
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

  constructor(private firestore: Firestore,
  private toastr: ToastrService
  ) {}

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
    var options = {
      "key": "rzp_test_R7raQKFj1qN71z", // Enter the Key ID generated from the Dashboard
      "amount": 50000, // Amount is in currency subunits.
      "currency": "INR",
      "name": "Maa Computer Press", //your business name
      "description": "Test Transaction",
      //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // "handler": function (response) {
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature)
      // },
      "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210"  //Provide the customer's phone number for better conversion rates 
      },
      "theme": {
        "color": "#3399cc"
      },
      handler: ((res: any) => {
        this.toastr.success("Payment Successfull")
        console.log("payment Done");
      })
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (any: any) => {
      this.toastr.error("Payment Failed")
    });
    rzp1.open();
  }
}
