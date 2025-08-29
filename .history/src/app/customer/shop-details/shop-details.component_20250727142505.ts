import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  imports: [RouterLink],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent {
constructor(private cartService: CartServi) {}

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
