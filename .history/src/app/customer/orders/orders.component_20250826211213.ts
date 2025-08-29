import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { CloudinaryService } from '../../services/cloudinary.service';
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

  selectedFile: File | null = null;
  orders: Orders[] = [];

  constructor(
    private orderService: OrdersService,
    private cloudinary: CloudinaryService,
    private toastr: ToastrService
  ) {
    this.loadOrders();
  }

  // ✅ File select handler
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitOrder(form: any) {
    if (form.invalid || !this.selectedFile) {
      this.toastr.error('Please fill all fields and upload image.');
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
      handler: (response: any) => {
        console.log('Payment Success:', response);
        this.toastr.success('Payment Successful ✅');
        this.uploadAndSaveOrder();
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
      this.toastr.error('Payment Failed ❌');
    });
    rzp1.open();
  }

  // ✅ Upload image to Cloudinary, then save order in Firestore
  uploadAndSaveOrder() {
    if (!this.selectedFile) return;

    this.cloudinary.uploadImage(this.selectedFile).subscribe({
      next: (res: any) => {
        this.orderData.imageUrl = res.secure_url;  // ✅ Cloudinary URL
        this.orderService.addOrder(this.orderData).then(() => {
          this.toastr.success('Order placed successfully!');
          this.resetForm();
        });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Image upload failed ❌');
      }
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
    this.selectedFile = null;
  }
}
