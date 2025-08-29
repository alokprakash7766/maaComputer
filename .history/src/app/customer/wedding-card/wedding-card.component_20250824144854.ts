import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';

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
    private router: Router
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
    orderNow(card: any) {
    this.router.navigate(['/orders'], { state: { card } });
  }
}
