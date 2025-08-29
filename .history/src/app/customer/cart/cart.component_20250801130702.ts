import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  addDoc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    const cartRef = collection(this.firestore, 'cart');
    collectionData(cartRef, { idField: 'id' }).subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Total per item
  getTotal(item: any): number {
    return item.price * item.quantity;
  }

  // Subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Remove item with confirmation
  async removeItem(productId: string) {
    const cartItem = this.cartItems.find(item => item.productId === productId);
    if (!cartItem || !cartItem.id) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from the cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(this.firestore, 'cart', cartItem.id));
        Swal.fire('Removed!', 'Item has been removed.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to remove item.', 'error');
        console.error('Error removing item:', error);
      }
    }
  }

  // ✅ Buy Now logic (Navigate to billing page)
  async buyNow() {
    if (this.cartItems.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty.', 'info');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Purchase',
      text: 'Do you want to proceed to buy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed to Billing',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      this.router.navigate(['/billings']);
    }
  }
}
