import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { WeddingCard } from '../../shared/models/weddingCard/wedding-card.model';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wedding-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.css']
})
export class WeddingCardComponent implements OnInit {
  weddingCardsList: WeddingCard[] = [];

  constructor(
    private weddingCardService: WeddingCardService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllWeddingCards();
  }

  // ✅ Same style as Category
  getAllWeddingCards() {
    this.spinner.show();
    this.weddingCardService.getAllWeddingCards().subscribe(
      (res: WeddingCard[]) => {
        this.weddingCardsList = res.map(c => {
          if ((c as any).createdAt?.toDate) {
            return { ...c, createdAt: (c as any).createdAt.toDate() };
          }
          return c;
        });
        this.spinner.hide();
        this.toastr.success("Wedding Cards Loaded!");
      },
      (err) => {
        this.spinner.hide();
        console.error("Error fetching wedding cards:", err);
        this.toastr.error("Failed to load wedding cards!");
      }
    );
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
}
