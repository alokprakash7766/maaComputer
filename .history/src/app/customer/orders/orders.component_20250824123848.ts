import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

// Firebase Storage imports
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orderData: Orders = {
    id: '',
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 1,
    imageUrl: '',
    createdAt: 0
  };

  selectedFile: File | null = null;

  constructor(
    private ordersService: OrdersService,
    private storage: Storage
  ) {}

  // 🔹 Handle File Select
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log("Selected File:", this.selectedFile);
    }
  }

  // 🔹 Submit Order with Image Upload
  async submitOrder() {
    if (!this.orderData.customerName || !this.orderData.address || !this.orderData.mobileNo) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }

    try {
      let imageUrl = '';

      // ✅ Upload image if selected
      if (this.selectedFile) {
        const filePath = `orders/${Date.now()}_${this.selectedFile.name}`;
        const storageRef = ref(this.storage, filePath);

        // Upload file to Firebase Storage
        await uploadBytes(storageRef, this.selectedFile);

        // Get Download URL
        imageUrl = await getDownloadURL(storageRef);
        this.orderData.imageUrl = imageUrl;
      }

      // ✅ Save order in Firestore
      await this.ordersService.addOrder(this.orderData);

      Swal.fire('Success', 'Your order has been placed!', 'success');

      // Reset form
      this.orderData = {
        id: '',
        customerName: '',
        address: '',
        mobileNo: '',
        quantity: 1,
        imageUrl: '',
        createdAt: 0
      };
      this.selectedFile = null;

    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire('Error', 'Something went wrong while placing order.', 'error');
    }
  }
}
