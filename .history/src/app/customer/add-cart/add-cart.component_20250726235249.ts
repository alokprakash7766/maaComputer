import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from src/app/shared/models/cart/cart.model'; // ✅ correct model path

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [],
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
      alert('Item removed from cart');
    });
  }

  increaseQty(item: CartItem) {
    this.cartService.updateCartItem(item.id!, {
      quantity: item.quantity + 1
    });
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCartItem(item.id!, {
        quantity: item.quantity - 1
      });
    }
  }
}
