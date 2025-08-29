import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding-card',
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.css']
})
export class WeddingCardComponent implements OnInit {
  loading: boolean = true; // ✅ Spinner ke liye
  weddingCardsList: WeddingCard[] = []; // ✅ Data store karne ke liye

  constructor(private weddingCardService: WeddingCardService) {}

  ngOnInit(): void {
    this.fetchWeddingCards();
  }

  // ✅ Backend se wedding cards fetch karna
  fetchWeddingCards(): void {
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (cards) => {
        this.weddingCardsList = cards;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching wedding cards:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Add to Cart button click
  addToCart(card: WeddingCard): void {
    console.log('Card added to cart:', card);
    // Yaha cart service ka code add karna hoga
  }
}
