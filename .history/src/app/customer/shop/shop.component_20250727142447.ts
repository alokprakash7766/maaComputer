import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
constructor(private cartServic: CartService) {}

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
