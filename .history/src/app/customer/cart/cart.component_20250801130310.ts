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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const cartRef = collection(this.firestore, 'cart');
    collectionData(cartRef, { idField: 'id' }).subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(item: any): number {
    return item.price * item.quantity;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

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

  // ✅ Buy Now logic
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
      confirmButtonText: 'Yes, Buy',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const billingData = {
        customerName: 'Guest', // You can replace with actual user
        address: 'N/A',
        phone: 'N/A',
        items: this.cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        subtotal: this.getSubtotal(),
        tax: 0,
        grandTotal: this.getSubtotal(), // Add tax if needed
        createdAt: new Date()
      };

      try {
        // Save order
        await addDoc(collection(this.firestore, 'billings'), billingData);

        // Clear cart
        for (const item of this.cartItems) {
          if (item.id) {
            await deleteDoc(doc(this.firestore, 'cart', item.id));
          }
        }

        Swal.fire('Success!', 'Your order has been placed.', 'success');
      } catch (error) {
        console.error('Buy error:', error);
        Swal.fire('Error', 'Something went wrong.', 'error');
      }
    }
  }
}
