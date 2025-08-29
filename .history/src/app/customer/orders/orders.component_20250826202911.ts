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
    createdAt: new Date()
  };

  orders: Orders[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private orderService: OrdersService, private toastr: ToastrService) {
    this.loadOrders();
  }

  // File Select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Submit Order with Razorpay
  async submitOrder(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }

    const amount = this.orderData.price * this.orderData.quantity * 100;

    const options: any = {
      key: 'rzp_test_R7raQKFj1qN71z',
      amount: amount,
      currency: 'INR',
      name: 'Maa Computers',
      description: 'Order Payment',
      prefill: {
        name: this.orderData.customerName,
        email: this.orderData.email,
        contact: this.orderData.mobile
      },
      theme: { color: '#3399cc' },
      handler: async (response: any) => {
        this.toastr.success('Payment Successful ✅');
        await this.saveOrder();
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
      this.toastr.error('Payment Failed ❌');
    });
    rzp1.open();
  }

  // Save Order with Image
  async saveOrder() {
    try {
      if (this.selectedFile) {
        const imageUrl = await this.orderService.uploadImage(this.selectedFile);
        this.orderData.imageUrl = imageUrl;
      }

      await this.orderService.addOrder(this.orderData);
      this.toastr.success('Order placed successfully!');
      this.resetForm();
    } catch (err) {
      this.toastr.error('Error saving order ❌');
      console.error(err);
    }
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  removeOrder(id: string) {
    this.orderService.deleteOrder(id);
    this.toastr.info('Order removed.');
  }

  resetForm() {
    this.orderData = {
      customerName: '',
      email: '',
      mobile: '',
      address: '',
      productName: '',
      quantity: 1,
      price: 0,
      createdAt: new Date()
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
