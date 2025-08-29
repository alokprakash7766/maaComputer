import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-billings',
  standalone: true,  // ✅ Angular standalone component
  imports: [],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {
  selectedProduct: any;
  quantity: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.selectedProduct = this.cartService.getBuyNowItem();
  }

  get totalPrice(): number {
    return this.selectedProduct ? this.selectedProduct.price * this.quantity : 0;
  }
}
