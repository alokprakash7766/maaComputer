import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// 🔹 Order Data Interface
interface OrderData {
  customerName: string;
  address: string;
  mobileNo: string;
  quantity: number;
  imageFile?: File | null;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  // 🔹 Initialize order data
  orderData: OrderData = {
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 1,
    imageFile: null
  };

  // 🔹 File select handler
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.orderData.imageFile = fileInput.files[0];
      console.log('Selected File:', this.orderData.imageFile);
    }
  }

  // 🔹 Submit order
  submitOrder() {
    if (!this.orderData.customerName || !this.orderData.address || !this.orderData.mobileNo) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }

    // Example: Creating a FormData to send with API (if backend exists)
    const formData = new FormData();
    formData.append('customerName', this.orderData.customerName);
    formData.append('address', this.orderData.address);
    formData.append('mobileNo', this.orderData.mobileNo);
    formData.append('quantity', this.orderData.quantity.toString());

    if (this.orderData.imageFile) {
      formData.append('image', this.orderData.imageFile);
    }

    console.log('Order Submitted:', this.orderData);

    // 🔹 Show confirmation
    Swal.fire('Success', 'Your order has been placed!', 'success');

    // 🔹 Reset form
    this.orderData = {
      customerName: '',
      address: '',
      mobileNo: '',
      quantity: 1,
      imageFile: null
    };
  }
}
