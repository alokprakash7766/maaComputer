import { Component, OnInit } from '@angular/core';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-wedding-card',
  imports: [],
  templateUrl: './all-wedding-card.component.html',
  styleUrl: './all-wedding-card.component.css'
})
export class AllWeddingCardComponent implements OnInit{
         weddingCardsList: WeddingCard[] = [];
          constructor(
    private router: Router,
    private productService: AddProductService,
    private serviceService: AddServicesService,
     private weddingCardService: WeddingCardService
  ) {}

}
