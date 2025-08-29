import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { ToastrService } from 'ngx-toastr';

declare var Razorpay: any;   // Razorpay declare करना ज़रूरी है

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

  // Place Order -> First Payment, then Save Order
  submitOrder() {
    // 💰 amount Razorpay को paisa (subunits) में देना होता है (₹1 = 100 paisa)
    const amount = this.orderData.price * this.orderData.quantity * 100;

    const options: any = {
      key: 'rzp_test_R7raQKFj1qN71z', // आपका Razorpay Key
      amount: amount,
      currency: 'INR',
      name: 'Maa Computers',
      description: 'Order Payment',
      prefill: {
        name: this.orderData.customerName,
        email: this.orderData.email,
        contact: this.orderData.mobile
      },
      theme: {
        color: '#3399cc'
      },
      handler: (response: any) => {
        console.log('Payment Success:', response);
        this.toastr.success('Payment Successful ✅');
        this.saveOrder(); // Payment success होने के बाद Order save होगा
      }
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', (response: any) => {
      console.error('Payment Failed:', response);
      this.toastr.error('Payment Failed ❌');
    });

    rzp1.open();
  }

  // Save order to Firebase
  saveOrder() {
    this.orderService.addOrder(this.orderData).then(() => {
      this.toastr.success('Order placed successfully!');
      this.resetForm();
    });
  }

  // Load Orders
  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  // Delete Order
  removeOrder(id: string) {
    this.orderService.deleteOrder(id);
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
      createdAt: new Date()
    };
  }
}
