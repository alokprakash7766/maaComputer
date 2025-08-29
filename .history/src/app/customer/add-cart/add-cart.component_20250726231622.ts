// src/app/pages/add-cart/add-cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart/cart.service';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  deleteItem(id: string) {
    this.cartService.deleteCartItem(id).then(() => {
      console.log("Item deleted");
    });
  }

  buyItem(item: CartItem) {
    alert(`Buying item: ${item.name} for ₹${item.price}`);
    // Optional: you can delete after purchase
    this.deleteItem(item.id!);
  }
}
