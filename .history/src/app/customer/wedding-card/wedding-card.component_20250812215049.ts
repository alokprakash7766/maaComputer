import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { WeddingCardService } from '../../services/weddingCard/wedding-card.service';

@Component({
  selector: 'app-wedding-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.css']
})
export class WeddingCardComponent implements OnInit {
  weddingCards$!: Observable<WeddingCard[]>; // async pipe ke liye

  constructor(private weddingCardService: WeddingCardService) {}

  ngOnInit(): void {
    this.weddingCards$ = this.weddingCardService.getAllWeddingCards();
  }
}
