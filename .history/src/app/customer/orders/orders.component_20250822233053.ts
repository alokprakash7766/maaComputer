import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports?:[],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderData = {
    name: '',
    address: '',
    mobileNo: '',
    image: ''
  };

  selectedCard: any = null;
  selectedFile: File | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // wedding-card से भेजा गया card ले रहे हैं
    const nav = history.state;
    if (nav && nav.card) {
      this.selectedCard = nav.card;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.orderData.image = reader.result as string; // base64 में convert
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitOrder() {
    console.log("Order Placed: ", {
      ...this.orderData,
      card: this.selectedCard
    });

    alert("✅ Order Placed Successfully!");
    this.router.navigate(['/']); // confirm होने के बाद home पर redirect
  }
}
