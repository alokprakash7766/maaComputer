import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';
import { OrdersService } from '../../services/orders/orders.service';
import { OrderModel } from '../../shared/models/orders/orders.model';

@Component({
  selector: 'app-wedding-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.css']
})
export class WeddingCardComponent implements OnInit {
  weddingCardsList: WeddingCard[] = [];

  constructor(
    private weddingCardService: WeddingCardService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWeddingCards();
  }

  private loadWeddingCards(): void {
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (cards) => {
        this.weddingCardsList = cards.map(c => {
          // 🔹 Convert Firestore Timestamp -> Date (if needed)
          if ((c as any).createdAt?.toDate) {
            return { ...c, createdAt: (c as any).createdAt.toDate() };
          }
          return c;
        });
      },
      error: (err) => {
        console.error("❌ Error fetching wedding cards:", err);
      }
    });
  }

  // 🛒 Add to Cart
  addToCart(card: WeddingCard): void {
    const cartItem: CartModel = {
      productId: card.id!,
      name: card.name,
      price: card.price,
      image: card.imageUrl || 'assets/img/default-image.png',
      quantity: 1
    };

    this.cartService.addToCart(cartItem)
      .then(() => {
        Swal.fire({
          title: 'Added to cart!',
          text: 'Do you want to go to cart?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/cart']);
          }
        });
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add wedding card to cart.',
          icon: 'error'
        });
        console.error("❌ Add to cart error:", err);
      });
  }

  // 🛍️ Place Order Immediately
  orderNow(card: WeddingCard): void {
    const order: OrderModel = {
      productId: card.id!,
      name: card.name,
      price: card.price,
      image: card.imageUrl || 'assets/img/default-image.png',
      quantity: 1,
      orderDate: new Date(),
      status: 'Pending'
    };

    this.ordersService.addOrder(order)
      .then(() => {
        Swal.fire({
          title: 'Order Placed!',
          text: 'Do you want to go to My Orders?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/orders']);
          }
        });
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to place order.',
          icon: 'error'
        });
        console.error("❌ Order error:", err);
      });
  }
}
