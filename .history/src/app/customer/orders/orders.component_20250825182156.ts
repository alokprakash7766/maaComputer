import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private orderService: OrdersService, private toastr: ToastrService) {
    this.loadOrders();
  }

  // Submit Order -> Validate + Payment
  submitOrder(form: any) {
    // ✅ 1. Form Validation
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }

    // ✅ 2. Razorpay Payment
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
      handler: (response: any) => {
        console.log('Payment Success:', response);
        this.toastr.success('Payment Successful ✅');
        this.saveOrder();
      }
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', (response: any) => {
      console.error('Payment Failed:', response);
      this.toastr.error('Payment Failed ❌');
    });

    rzp1.open();
  }
  
  saveOrder() {
    this.orderService.addOrder(this.orderData).then(() => {
      this.toastr.success('Order placed successfully!');
      this.resetForm();
    });
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
  }
}
