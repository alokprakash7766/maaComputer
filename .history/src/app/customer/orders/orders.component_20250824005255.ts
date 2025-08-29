import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports:[FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderData: any = {
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 0,
    userImage: ''
  };

  selectedCard: any = null;
  selectedFile: File | null = null;

  constructor(private router: Router, private orderService: OrdersService) {}

  ngOnInit(): void {
    const nav = history.state;
    if (nav && nav.card) {
      this.selectedCard = nav.card;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async submitOrder() {
    try {
      let uploadedUserImageUrl = '';
      if (this.selectedFile) {
        uploadedUserImageUrl = await this.orderService.uploadImage(this.selectedFile);
      }

      const order: Orders = {
        ...this.orderData,
        card: {
          name: this.selectedCard?.name,
          price: this.selectedCard?.price,
          description: this.selectedCard?.description,
          image: this.selectedCard?.image
        },
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
