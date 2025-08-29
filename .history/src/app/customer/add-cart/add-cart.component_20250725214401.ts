import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent {
  constructor(private cartService: CartService, private router: Router) {}

  product = {
    id: 101,
    name: 'Printed T-shirt',
    price: 399
  };

  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/addtocart');
  }
}
