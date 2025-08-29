import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';  // adjust the path
import { CartModel } from '../../shared/models/cart/cart.model';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {
  @Input() product!: CartModel;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart({ ...this.product, quantity: 1 });
    alert(`${this.product.name} added to cart`);
  }
}
