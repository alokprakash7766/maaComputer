import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { OrdersService } from '../../services/orders/orders.service';
import { AuthService } from '../../shared/auth/auth.service';

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
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (cards) => {
        this.weddingCardsList = cards.map(c => {
          if ((c as any).createdAt && (c as any).createdAt.toDate) {
            return {
              ...c,
              createdAt: (c as any).createdAt.toDate()
            };
          }
          return c;
        });
      },
      error: (err) => {
        console.error("Error fetching wedding cards:", err);
      }
    });
  }

  addToCart(card: WeddingCard) {
    const cartItem: CartModel = {
      productId: card.id!,
      name: card.name,
      price: card.price,
      image: card.imageUrl ?? 'assets/img/default-image.png',
      quantity: 1
    };

    this.cartService.addToCart(cartItem)
      .then(() => {
        Swal.fire({
          title: 'Added to cart!',
          text: 'Go to cart?',
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
        console.error(err);
      });
  }

  orderNow(card: WeddingCard) {
    const order: Orders = {
      productId: card.id!,
      productName: card.name,
      price: card.price,
      quantity: 1,
      customerName: "Guest User",
      customerEmail: "guest@example.com",
      mobileNo: "9876543210",   // ✅ Added Mobile No
      orderDate: new Date(),
      status: "pending"
    };

    this.ordersService.addOrder(order).then(() => {
      Swal.fire({
        title: '✅ Order placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }).catch(err => {
      console.error("Order error:", err);
      Swal.fire({
        title: '❌ Failed to place order!',
        icon: 'error'
      });
    });
  }
}
