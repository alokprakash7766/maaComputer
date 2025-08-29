import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: (CartModel & { id: string })[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(item: CartModel): number {
    return item.price * item.quantity;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + this.getTotal(item), 0);
  }

 async removeItem(cartItemId: string) {
  console.log("Deleting cart item with id:", cartItemId); // Debugging
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
      await this.cartService.removeFromCart(cartItemId);
      Swal.fire('Removed!', 'Item has been removed.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to remove item.', 'error');
      console.error('Error removing item:', error);
    }
  }
}


  updateQuantity(item: CartModel & { id: string }, change: number) {
    const newQty = item.quantity + change;
    if (newQty < 1) return;

    this.cartService.updateQuantity(item.id, newQty)
      .catch(err => {
        Swal.fire('Error', 'Failed to update quantity.', 'error');
        console.error(err);
      });
  }

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

  trackByProductId(index: number, item: CartModel & { id: string }) {
    return item.id;
  }
  // ✅ Option 1: Direct Payment via Razorpay
  buyNowDirect(item: CartModel & { id: string }) {
    const options: any = {
      key: 'rzp_test_R7raQKFj1qN71z',
      amount: this.getTotal(item) * 100, // paisa me
      currency: 'INR',
      name: 'Maa Computer Press',
      description: item.name,
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: { color: '#3399cc' },
      handler: (res: any) => {
        Swal.fire('Success', `Payment Successful! ID: ${res.razorpay_payment_id}`, 'success');
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', (err: any) => {
      Swal.fire('Failed', 'Payment failed. Try again.', 'error');
    });
    rzp.open();
  }

  // ✅ Option 2: Go to Billing Page
  async buyNowBilling() {
    if (this.cartItems.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty.', 'info');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Purchase',
      text: 'Do you want to proceed to Billing?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      this.router.navigate(['/billings']);
    }
  }

  // trackByProductId(index: number, item: CartModel & { id: string }) {
  //   return item.id;
  }

}
