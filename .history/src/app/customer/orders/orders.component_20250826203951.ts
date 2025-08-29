import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { ToastrService } from 'ngx-toastr';

declare var Razorpay: any;

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  order: Orders = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    productName: '',
    quantity: 1,
    price: 0,
    imageUrl: '',
    createdAt: new Date().toISOString()
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  // ✅ File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // ✅ Razorpay Payment
  async payNow() {
    if (!this.order.customerName || !this.order.customerEmail) {
      this.toastr.error('Please fill all customer details');
      return;
    }

    const options = {
      key: 'rzp_test_xxxxxx', // 🔑 Replace with your Razorpay key
      amount: this.order.price * 100,
      currency: 'INR',
      name: 'My Shop',
      description: 'Order Payment',
      handler: async (response: any) => {
        this.toastr.success('Payment Successful!');
        await this.saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: this.order.customerName,
        email: this.order.customerEmail,
        contact: this.order.customerPhone
      },
      theme: { color: '#3399cc' }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  // ✅ Save Order (Firestore + Image)
  async saveOrder(paymentId: string) {
    try {
      let imageUrl = '';
      if (this.selectedFile) {
        imageUrl = await this.ordersService.uploadImage(this.selectedFile);
      }

      const newOrder: Orders = {
        ...this.order,
        imageUrl: imageUrl,
        paymentId: paymentId,
        createdAt: new Date().toISOString()
      };

      await this.ordersService.addOrder(newOrder);

      this.toastr.success('Order Saved Successfully!');
      this.resetForm();
    } catch (error) {
      console.error('Error saving order:', error);
      this.toastr.error('Failed to save order');
    }
  }

  // ✅ Reset form
  resetForm() {
    this.order = {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      address: '',
      productName: '',
      quantity: 1,
      price: 0,
      imageUrl: '',
      createdAt: new Date().toISOString()
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
