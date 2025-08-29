import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {
  name = '';
  email = '';
  phone = '';
  address = '';
  cartItems: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const cartRef = collection(this.firestore, 'cart');
    collectionData(cartRef, { idField: 'id' }).subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Total
  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Save billing + clear cart
  async placeOrder() {
    if (!this.name || !this.email || !this.phone || !this.address) {
      Swal.fire('Missing Info', 'Please fill all billing fields.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Order',
      text: 'Do you want to place this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Place Order',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const billingRef = collection(this.firestore, 'billings');

      await addDoc(billingRef, {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        items: this.cartItems,
        total: this.getTotal(),
        date: new Date()
      });

      // ✅ Only clear cart after billing is saved
      for (const item of this.cartItems) {
        await deleteDoc(doc(this.firestore, 'cart', item.id));
      }

      Swal.fire('Success', 'Order placed successfully!', 'success');
      
      // Optional: reset fields
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire('Error', 'Order failed to save.', 'error');
    }
  }
}
