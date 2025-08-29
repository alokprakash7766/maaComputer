import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service'; // Adjust the path as per your project

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent {

  constructor(private cartService: CartServic, private router: Router) {}

  product = {
    id: 1,
    name: 'Stylish T-Shirt',
    price: 499
  };

  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/addtocart');
  }
}
