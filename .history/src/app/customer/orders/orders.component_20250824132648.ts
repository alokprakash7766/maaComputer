import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
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
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 1,
    userImage: '',
    card: {
      name: '',
      description: '',
      price: 0,
      image: ''
    },
    createdAt: 0
  };

  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private storage: Storage
  ) {
    // 🔹 Router se card data lena
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['card']) {
      this.orderData.card = nav.extras.state['card'];
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  async submitOrder() {
    if (!this.orderData.customerName || !this.orderData.address || !this.orderData.mobileNo) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }

    try {
      // 🔹 Agar user image upload hui hai to Firebase Storage me save karo
      if (this.selectedFile) {
        const filePath = `orders/${Date.now()}_${this.selectedFile.name}`;
        const storageRef = ref(this.storage, filePath);
        await uploadBytes(storageRef, this.selectedFile);
        this.orderData.userImage = await getDownloadURL(storageRef);
      }

      // 🔹 Timestamp set
      this.orderData.createdAt = Date.now();

      // 🔹 Firestore me save
      await this.ordersService.addOrder(this.orderData);

      Swal.fire('Success', 'Your order has been placed!', 'success');

      // ✅ Reset
      this.orderData = {
        customerName: '',
        address: '',
        mobileNo: '',
        quantity: 1,
        userImage: '',
        card: { name: '', description: '', price: 0, image: '' },
        createdAt: 0
      };
      this.selectedFile = null;

      this.router.navigate(['/home']); // Order ke baad Home pe bhej diya
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong while placing order.', 'error');
    }
  }
}
