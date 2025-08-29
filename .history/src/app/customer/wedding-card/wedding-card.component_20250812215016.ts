import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingCardService } from '../../services/services/wedding-card.service';
import { WeddingCard } from '../../shared/models/wedding-card.model';
import { Observable } from 'rxjs';

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
