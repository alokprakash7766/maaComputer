import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { ToastrService } from 'ngx-toastr';

declare var Razorpay: any;

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderData: Orders = {
    customerName: '',
    email: '',
    mobile: '',
    address: '',
    productName: '',
    quantity: 1,
    price: 0,
    createdAt: new Date().toISOString()
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  // File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Submit order → Payment + Save
  async submitOrder(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    const options = {
      key: 'rzp_test_xxxxxx', // 🔑 replace with your Razorpay key
      amount: this.orderData.price * this.orderData.quantity * 100,
      currency: 'INR',
      name: 'My Shop',
      description: 'Order Payment',
      handler: async (response: any) => {
        this.toastr.success('Payment Successful ✅');
        await this.saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: this.orderData.customerName,
        email: this.orderData.email,
        contact: this.orderData.mobile
      },
      theme: { color: '#3399cc' }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', () => {
      this.toastr.error('Payment Failed ❌');
    });
    rzp.open();
  }

  // Save order with image
  async saveOrder(paymentId: string) {
    try {
      let imageUrl = '';
      if (this.selectedFile) {
        imageUrl = await this.ordersService.uploadImage(this.selectedFile);
      }

      const newOrder: Orders = {
        ...this.orderData,
        imageUrl,
        paymentId,
        createdAt: new Date().toISOString()
      };

      await this.ordersService.addOrder(newOrder);
      this.toastr.success('Order placed successfully!');
      this.resetForm();
    } catch (error) {
      console.error('Error saving order:', error);
      this.toastr.error('Error saving order ❌');
    }
  }

  // Reset form
  resetForm() {
    this.orderData = {
      customerName: '',
      email: '',
      mobile: '',
      address: '',
      productName: '',
      quantity: 1,
      price: 0,
      createdAt: new Date().toISOString()
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
