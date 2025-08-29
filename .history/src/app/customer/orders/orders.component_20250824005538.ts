import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Orders } from '../../shared/models/orders/orders.model';
import { OrderService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderData: Partial<Orders> = {
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 1,
  };

  selectedCard: any = null; // Card details from navigation
  selectedFile: File | null = null;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    // Navigation ke through card receive karne ki try
    const nav = this.router.getCurrentNavigation();
    this.selectedCard = nav?.extras?.state?.['card'] || null;
  }

  // File selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Order submit
  async submitOrder() {
    try {
      let uploadedUserImageUrl = '';
      if (this.selectedFile) {
        uploadedUserImageUrl = await this.orderService.uploadImage(this.selectedFile);
      }

      // Agar card nahi mila, fallback object bhej do
      const cardData = this.selectedCard ? {
        name: this.selectedCard.name,
        price: this.selectedCard.price,
        description: this.selectedCard.description,
        image: this.selectedCard.image
      } : {
        name: '',
        price: 0,
        description: '',
        image: ''
      };

      const order: Orders = {
        customerName: this.orderData.customerName || '',
        address: this.orderData.address || '',
        mobileNo: this.orderData.mobileNo || '',
        quantity: this.orderData.quantity || 1,
        card: cardData,
        userImage: uploadedUserImageUrl,
        createdAt: new Date()
      };

      console.log("🚀 Final Order Object:", order);

      await this.orderService.placeOrder(order);

      alert('✅ Order Placed Successfully!');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('❌ Order Save Failed:', err);
      alert('❌ Failed to place order! Check console.');
    }
  }
}
