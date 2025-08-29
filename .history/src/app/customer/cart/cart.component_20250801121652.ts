import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  //  Total per item
  getTotal(item: any): number {
    return item.price * item.quantity;
  }

  //  Subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  //  Remove item with confirmation
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
}
