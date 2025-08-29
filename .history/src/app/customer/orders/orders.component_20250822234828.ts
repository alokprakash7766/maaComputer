import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../../shared/models/orders/orders.model';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  imports:
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderData: Partial<Orders> = {
    customerName: '',
    address: '',
    mobileNo: '',
    quantity: 1,
    userImage: ''
  };

  selectedCard: any = null;
  selectedFile: File | null = null;

  constructor(private router: Router, private orderService: OrdersService) { }

  ngOnInit(): void {
    // wedding-card से card details मिलेंगी
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

      // ✅ Final Order Object
      const order: Orders = {
        customerName: this.orderData.customerName!,
        address: this.orderData.address!,
        mobileNo: this.orderData.mobileNo!,
        quantity: this.orderData.quantity!,
        userImage: uploadedUserImageUrl,
        card: {
          name: this.selectedCard.name,
          description: this.selectedCard.description,
          price: this.selectedCard.price,
          image: this.selectedCard.image
        },
        createdAt: new Date()
      };

      await this.orderService.placeOrder(order);

      alert('✅ Order Placed Successfully!');
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to place order!');
    }
  }
}
