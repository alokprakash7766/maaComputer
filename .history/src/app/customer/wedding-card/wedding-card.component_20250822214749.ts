import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';
import { OrdersService } from '../../services/orders/orders.service';
import { Orders } from '../../shared/models/orders/orders.model';

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
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (cards) => {
        this.weddingCardsList = cards.map(c => {
          if ((c as any).createdAt && (c as any).createdAt.toDate) {
            return { ...c, createdAt: (c as any).createdAt.toDate() };
          }
          return c;
        });
      },
      error: (err) => {
        console.error("Error fetching wedding cards:", err);
      }
    });
  }

  // 🛒 Add to Cart
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

  // Order Now
  orderNow(card: WeddingCard) {
    Swal.fire({
      title: 'Place Your Order',
      html: `
        <input id="name" class="swal2-input" placeholder="Your Name">
        <input id="email" class="swal2-input" placeholder="Your Email">
        <input id="phone" class="swal2-input" placeholder="Your Phone">
        <input id="address" class="swal2-input" placeholder="Your Address">
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit Order',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const address = (document.getElementById('address') as HTMLInputElement).value;

        if (!name || !email || !phone || !address) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }
        return { name, email, phone, address };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const order: Orders = {
          productId: card.id!,
          productName: card.name,
          price: card.price,
          quantity: 1,
          customerName: result.value!.name,
          customerEmail: result.value!.email,
          customerPhone: result.value!.phone,
          address: result.value!.address,
          createdAt: new Date()
        };

        this.orderService.placeOrder(order)
          .then(() => {
            Swal.fire("Success!", "Your order has been placed.", "success");
          })
          .catch(err => {
            Swal.fire("Error!", "Failed to place order.", "error");
            console.error(err);
          });
      }
    });
  }
}
