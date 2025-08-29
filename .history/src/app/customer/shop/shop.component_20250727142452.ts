import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
constructor(private cartService: CartService) {}

addToCart(product: any) {
  this.cartService.addToCart({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  });
}
}
